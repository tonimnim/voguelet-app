import { Box } from '@/components/ui/box';
import { ScrollView } from '@/components/ui/scroll-view';
import type { CategoryChild } from '@/src/api/types';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { CategoryAvatar } from '@/src/features/catalog/components/CategoryAvatar';

interface CategoryRailProps {
  status: 'pending' | 'error' | 'success';
  categories: CategoryChild[];
  onRetry: () => void;
  onSelect: (category: CategoryChild) => void;
}

/** Horizontal scroller of category avatars — Home today, category landing pages next. */
export function CategoryRail({ status, categories, onRetry, onSelect }: CategoryRailProps) {
  if (status === 'pending') {
    return (
      <Box className="flex-row gap-5">
        <Skeleton width={56} height={56} radius={999} />
        <Skeleton width={56} height={56} radius={999} />
        <Skeleton width={56} height={56} radius={999} />
        <Skeleton width={56} height={56} radius={999} />
      </Box>
    );
  }

  if (status === 'error') {
    return <ErrorState onRetry={onRetry} />;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-5 pr-6">
      {categories.map((category) => (
        <CategoryAvatar key={category.code} code={category.code} name={category.name} onPress={() => onSelect(category)} />
      ))}
    </ScrollView>
  );
}
