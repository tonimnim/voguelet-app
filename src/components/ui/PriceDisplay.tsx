import { Text } from '@/components/ui/text';
import { formatPrice } from '@/src/utils/currency';

interface PriceDisplayProps {
  price: string;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function PriceDisplay({ price, currency = 'KES', size = 'md', className }: PriceDisplayProps) {
  return (
    <Text bold size={size} className={`text-foreground ${className ?? ''}`} maxFontSizeMultiplier={1.6}>
      {formatPrice(price, currency)}
    </Text>
  );
}
