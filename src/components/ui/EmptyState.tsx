import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box className="items-center justify-center p-8" accessibilityRole="text">
      <Text size="lg" bold className="text-foreground text-center">
        {title}
      </Text>
      {message ? <Text className="text-muted-foreground text-center mt-2">{message}</Text> : null}
      {actionLabel && onAction ? (
        <Box className="mt-5 w-full">
          <Button label={actionLabel} variant="secondary" onPress={onAction} />
        </Box>
      ) : null}
    </Box>
  );
}
