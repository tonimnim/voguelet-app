import { Skeleton as GSSkeleton } from '@/components/ui/skeleton';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
}

/**
 * Dimensions are call-site-specific and computed at runtime, so they go through
 * `style` rather than className — Tailwind's static analysis can't see arbitrary
 * values built from a variable (only literal strings in source), so a template
 * string like `w-[${width}px]` would silently fail to generate CSS.
 */
export function Skeleton({ width = '100%', height = 16, radius = 4 }: SkeletonProps) {
  return (
    <GSSkeleton
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width, height, borderRadius: radius }}
    />
  );
}
