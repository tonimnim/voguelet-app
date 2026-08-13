import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box className="items-center justify-center p-8" accessibilityRole="alert">
      <Text size="lg" bold className="text-foreground text-center">
        {title}
      </Text>
      <Text className="text-muted-foreground text-center mt-2">{message}</Text>
      {onRetry ? (
        <Box className="mt-5 w-full">
          <Button label="Try again" variant="secondary" onPress={onRetry} />
        </Box>
      ) : null}
    </Box>
  );
}
