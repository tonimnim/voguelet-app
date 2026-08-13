import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';

import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { StyledFeather } from '@/src/lib/styledIcons';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
}

export function ScreenHeader({ title, showBack = true, right }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <Box className="flex-row items-center px-2 py-3 border-b border-border/60">
      <Box className="flex-1 justify-center">
        {showBack && router.canGoBack() ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            className="min-h-11 min-w-11 items-start justify-center"
            onPress={() => router.back()}>
            <StyledFeather name="arrow-left" size={22} className="text-foreground" />
          </Pressable>
        ) : null}
      </Box>
      <Text
        size="lg"
        bold
        className="text-foreground flex-[2] text-center"
        numberOfLines={1}
        maxFontSizeMultiplier={1.4}>
        {title}
      </Text>
      <Box className="flex-1 items-end justify-center">{right}</Box>
    </Box>
  );
}
