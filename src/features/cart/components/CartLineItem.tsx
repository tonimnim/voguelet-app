import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { IconButton } from '@/src/components/ui/IconButton';

interface CartLineItemProps {
  title: string;
  unitPrice: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

/** One cart row — quantity stepper + remove. Shared by the guest (local) and signed-in (server) cart. */
export function CartLineItem({ title, unitPrice, quantity, onIncrement, onDecrement, onRemove }: CartLineItemProps) {
  return (
    <Box className="flex-row items-center gap-3 py-3 border-b border-border/60">
      <Box className="flex-1">
        <Text numberOfLines={2} className="text-foreground">
          {title}
        </Text>
        <Text size="xs" className="text-muted-foreground mt-0.5">
          KES {unitPrice} · Qty {quantity}
        </Text>
      </Box>
      <Box className="flex-row items-center gap-2">
        <IconButton icon="minus" accessibilityLabel={`Decrease quantity of ${title}`} onPress={onDecrement} />
        <Text bold className="text-foreground min-w-5 text-center">
          {quantity}
        </Text>
        <IconButton icon="plus" accessibilityLabel={`Increase quantity of ${title}`} onPress={onIncrement} />
        <IconButton icon="trash-2" accessibilityLabel={`Remove ${title} from cart`} onPress={onRemove} />
      </Box>
    </Box>
  );
}
