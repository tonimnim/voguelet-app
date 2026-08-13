import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';

export function LoadingState() {
  return (
    <Box className="items-center justify-center p-8" accessibilityLabel="Loading" accessibilityRole="progressbar">
      <Spinner className="text-muted-foreground" />
    </Box>
  );
}
