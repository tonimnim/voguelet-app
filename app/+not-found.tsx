import { Link, Stack } from 'expo-router';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <Box className="flex-1 items-center justify-center p-6 bg-background">
        <Text size="xl" bold className="text-foreground">
          This screen doesn&rsquo;t exist.
        </Text>
        <Link href="/" className="mt-3 min-h-11 justify-center">
          <Text className="text-primary underline">Go to home</Text>
        </Link>
      </Box>
    </>
  );
}
