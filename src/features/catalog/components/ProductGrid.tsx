import { Box } from '@/components/ui/box';
import type { PublicProductList } from '@/src/api/types';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { ProductCard } from '@/src/features/catalog/components/ProductCard';

interface ProductGridProps {
  status: 'pending' | 'error' | 'success';
  products: PublicProductList[];
  onRetry: () => void;
  onSelect: (product: PublicProductList) => void;
  emptyTitle: string;
  emptyMessage?: string;
}

/** 2-column product grid with loading/error/empty states — Home, category, and search results. */
export function ProductGrid({ status, products, onRetry, onSelect, emptyTitle, emptyMessage }: ProductGridProps) {
  if (status === 'pending') {
    return (
      <Box className="flex-row flex-wrap gap-3">
        <Skeleton width="47%" height={220} />
        <Skeleton width="47%" height={220} />
      </Box>
    );
  }

  if (status === 'error') {
    return <ErrorState onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <Box className="flex-row flex-wrap gap-3">
      {products.map((product) => (
        <Box key={product.slug} className="w-[47%]">
          <ProductCard product={product} onPress={() => onSelect(product)} />
        </Box>
      ))}
    </Box>
  );
}
