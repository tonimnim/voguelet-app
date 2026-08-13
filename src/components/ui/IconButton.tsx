import type { Feather } from '@expo/vector-icons';

import { Pressable } from '@/components/ui/pressable';
import { StyledFeather } from '@/src/lib/styledIcons';

interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  accessibilityLabel?: string;
}

/** Small square icon-only button — quantity steppers, inline row actions. */
export function IconButton({ icon, onPress, accessibilityLabel }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? icon}
      onPress={onPress}
      hitSlop={8}
      className="h-8 w-8 items-center justify-center rounded border border-border data-[active=true]:opacity-60">
      <StyledFeather name={icon} size={14} className="text-foreground" />
    </Pressable>
  );
}
