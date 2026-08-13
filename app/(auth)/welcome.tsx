import { useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { Button } from '@/src/components/ui/Button';

const VERTICALS = ['Fashion', 'Beauty & Skincare', "Women's Health & Care"];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-between bg-background">
      <Box className="px-6 pt-8">
        <Text size="xs" bold className="text-muted-foreground tracking-[2px]">
          VOGUELET
        </Text>
        <Text size="4xl" bold className="text-foreground mt-3">
          {'Considered shopping,\nmade for women.'}
        </Text>
        <Text className="text-muted-foreground mt-4">
          Discover and buy from trusted sellers — without the noise, the weak product
          information, or the guesswork of shopping on social media.
        </Text>

        <Box className="mt-6 gap-2">
          {VERTICALS.map((vertical) => (
            <Box key={vertical} className="pt-3 border-t border-border/60">
              <Text size="lg" bold className="text-foreground">
                {vertical}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="p-6">
        <Button label="Continue with email" onPress={() => router.push('/(auth)/sign-in')} />
      </Box>
    </SafeAreaView>
  );
}
