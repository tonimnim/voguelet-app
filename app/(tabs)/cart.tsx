import { useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { GroupedSection } from '@/src/components/ui/GroupedSection';
import { LoadingState } from '@/src/components/ui/LoadingState';
import { CartLineItem } from '@/src/features/cart/components/CartLineItem';
import { useCart, useRemoveCartItem, useUpdateCartItem, groupCartItemsBySeller } from '@/src/features/cart/hooks';
import { useAuthStore } from '@/src/stores/authStore';
import { groupGuestCartItemsBySeller, useGuestCartStore } from '@/src/stores/guestCartStore';

export default function CartScreen() {
  const isGuest = useAuthStore((s) => s.status === 'signedOut');
  return isGuest ? <GuestCart /> : <SignedInCart />;
}

/** Adding to cart needs no account — this reads the on-device cart (src/stores/guestCartStore.ts). */
function GuestCart() {
  const router = useRouter();
  const items = useGuestCartStore((s) => s.items);
  const updateQuantity = useGuestCartStore((s) => s.updateQuantity);
  const removeItem = useGuestCartStore((s) => s.removeItem);
  const subtotal = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text size="2xl" bold className="text-foreground px-6 pt-6">
        Cart
      </Text>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          message="Items you add are saved on this device — sign in any time to check out."
          actionLabel="Browse categories"
          onAction={() => router.push('/(tabs)')}
        />
      ) : (
        <>
          <ScrollView contentContainerClassName="p-6 gap-5">
            {groupGuestCartItemsBySeller(items).map((group) => (
              <GroupedSection key={group.sellerSlug} title={group.sellerName}>
                {group.items.map((item) => (
                  <CartLineItem
                    key={item.variantId}
                    title={item.productTitle}
                    unitPrice={item.unitPrice}
                    quantity={item.quantity}
                    onIncrement={() => updateQuantity(item.variantId, item.quantity + 1)}
                    onDecrement={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                    onRemove={() => removeItem(item.variantId)}
                  />
                ))}
              </GroupedSection>
            ))}
          </ScrollView>
          <Box className="p-6 border-t border-border/60 bg-background">
            <Box className="flex-row justify-between items-center mb-4">
              <Text className="text-muted-foreground">Subtotal</Text>
              <Text size="lg" bold className="text-foreground">
                KES {subtotal}
              </Text>
            </Box>
            <Button label="Sign in to check out" onPress={() => router.push('/(auth)/welcome')} />
          </Box>
        </>
      )}
    </SafeAreaView>
  );
}

function SignedInCart() {
  const router = useRouter();
  const cartQuery = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text size="2xl" bold className="text-foreground px-6 pt-6">
        Cart
      </Text>

      {cartQuery.isPending ? (
        <LoadingState />
      ) : cartQuery.isError ? (
        <ErrorState onRetry={() => cartQuery.refetch()} />
      ) : cartQuery.data.items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          message="Items you add will show up here, grouped by seller."
          actionLabel="Browse categories"
          onAction={() => router.push('/(tabs)')}
        />
      ) : (
        <>
          <ScrollView contentContainerClassName="p-6 gap-5">
            {groupCartItemsBySeller(cartQuery.data.items).map((group) => (
              <GroupedSection key={group.sellerSlug} title={group.sellerName}>
                {group.items.map((item) => (
                  <CartLineItem
                    key={item.id}
                    title={item.product_title}
                    unitPrice={item.unit_price}
                    quantity={item.quantity}
                    onIncrement={() =>
                      updateItem.mutate({ itemId: item.id, payload: { quantity: item.quantity + 1 } })
                    }
                    onDecrement={() =>
                      updateItem.mutate({ itemId: item.id, payload: { quantity: Math.max(1, item.quantity - 1) } })
                    }
                    onRemove={() => removeItem.mutate(item.id)}
                  />
                ))}
              </GroupedSection>
            ))}
          </ScrollView>
          <Box className="p-6 border-t border-border/60 bg-background">
            <Box className="flex-row justify-between items-center mb-4">
              <Text className="text-muted-foreground">Subtotal</Text>
              <Text size="lg" bold className="text-foreground">
                KES {cartQuery.data.subtotal}
              </Text>
            </Box>
            <Button label="Checkout" onPress={() => router.push('/checkout/address' as never)} />
          </Box>
        </>
      )}
    </SafeAreaView>
  );
}
