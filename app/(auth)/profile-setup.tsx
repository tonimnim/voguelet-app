import { useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { Button } from '@/src/components/ui/Button';
import { useAuthStore } from '@/src/stores/authStore';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView className="flex-1 justify-between bg-background">
      <Box className="p-6 pt-8">
        <Text size="xs" bold className="text-muted-foreground tracking-[2px]">
          YOU&rsquo;RE IN
        </Text>
        <Text size="4xl" bold className="text-foreground mt-3">
          Welcome to Voguelet
        </Text>
        <Text className="text-muted-foreground mt-4">
          You&rsquo;re signed in as {user?.email || user?.username}. Add a delivery address any time
          from Account before you check out.
        </Text>
      </Box>
      <Box className="p-6">
        <Button label="Start browsing" onPress={() => router.replace('/(tabs)')} />
      </Box>
    </SafeAreaView>
  );
}
