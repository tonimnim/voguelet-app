import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import type { PublicProductList } from '@/src/api/types';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { PriceDisplay } from '@/src/components/ui/PriceDisplay';
import { StyledFeather, StyledIonicons } from '@/src/lib/styledIcons';
import { useWishlistStore } from '@/src/stores/wishlistStore';

interface ProductCardProps {
  product: PublicProductList;
  onPress: () => void;
}

/** Generic product tile — reused across Home, category, and search results. */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const image = product.images[0];
  const isLiked = useWishlistStore((s) => s.isLiked(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${product.title}, ${product.seller.name}, ${product.price_from} shillings`}
      onPress={onPress}
      className="flex-1 data-[active=true]:opacity-90">
      <Box className="aspect-[3/4] rounded-md overflow-hidden bg-muted">
        {image ? (
          // expo-image (not gluestack's Image) for its caching/transition/placeholder
          // handling — a documented exception to "gluestack components only".
          <Image
            source={{ uri: image.url }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={150}
            accessibilityIgnoresInvertColors
          />
        ) : (
          <Box className="flex-1 items-center justify-center">
            <StyledFeather name="image" size={22} className="text-muted-foreground" />
          </Box>
        )}

        {/* Local-only for now — no wishlist endpoint on the backend yet, works for guests and signed-in alike. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isLiked ? `Remove ${product.title} from liked items` : `Like ${product.title}`}
          hitSlop={8}
          onPress={() =>
            toggleWishlist({
              productSlug: product.slug,
              productTitle: product.title,
              sellerName: product.seller.name,
              priceFrom: product.price_from,
              imageUrl: image?.url,
            })
          }
          className="absolute top-2 right-2 h-7 w-7 items-center justify-center rounded-full bg-background">
          <StyledIonicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={16}
            className={isLiked ? 'text-destructive' : 'text-foreground'}
          />
        </Pressable>
      </Box>

      {product.brand ? (
        <Text size="xs" className="text-muted-foreground mt-2" numberOfLines={1}>
          {product.brand.toUpperCase()}
        </Text>
      ) : null}
      <Text bold className="text-foreground mt-0.5" numberOfLines={2}>
        {product.title}
      </Text>
      <Box className="mt-1">
        <PriceDisplay price={product.price_from} />
      </Box>
    </Pressable>
  );
}
