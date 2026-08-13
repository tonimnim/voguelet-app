import { useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { SearchEntryBar } from '@/src/components/ui/SearchEntryBar';
import { CategoryRail } from '@/src/features/catalog/components/CategoryRail';
import { ProductGrid } from '@/src/features/catalog/components/ProductGrid';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/src/features/catalog/mockData';
import { StyledFeather } from '@/src/lib/styledIcons';

export default function HomeScreen() {
  const router = useRouter();

  // DESIGN PREVIEW: mock catalog data in place of useCategories()/useProducts() while
  // we iterate on layout (see src/features/catalog/mockData.ts for why). Swap these
  // two lines back to the real hooks once we're wiring against the live API — nothing
  // else on this screen needs to change, CategoryRail/ProductGrid just take props.
  const leafCategories = MOCK_CATEGORIES.flatMap((root) => root.children);
  const newArrivals = MOCK_PRODUCTS;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView contentContainerClassName="px-6 pt-2 pb-12" showsVerticalScrollIndicator={false}>
        <Box className="flex-row items-center justify-between">
          <Text size="xs" bold className="text-foreground tracking-[2px]">
            VOGUELET
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            hitSlop={4}
            className="min-h-11 min-w-11 items-center justify-center"
            onPress={() => router.push('/notifications' as never)}>
            <StyledFeather name="bell" size={20} className="text-foreground" />
          </Pressable>
        </Box>

        <Text size="2xl" bold className="text-foreground mt-3">
          Shop with confidence
        </Text>

        <Box className="mt-5">
          <SearchEntryBar />
        </Box>

        <Box className="mt-6">
          <CategoryRail
            status="success"
            categories={leafCategories}
            onRetry={() => {}}
            onSelect={(category) => router.push(`/category/${category.code}` as never)}
          />
        </Box>

        <Box className="mt-8">
          <Text size="lg" bold className="text-foreground mb-3">
            New arrivals
          </Text>
          <ProductGrid
            status="success"
            products={newArrivals}
            onRetry={() => {}}
            onSelect={(product) => router.push(`/product/${product.slug}` as never)}
            emptyTitle="New arrivals are on their way"
            emptyMessage="Sellers are still onboarding — check back soon for considered picks across fashion, beauty, and care."
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
