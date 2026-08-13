import type { ReactNode } from 'react';
import type { Feather } from '@expo/vector-icons';

import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { StyledFeather } from '@/src/lib/styledIcons';

interface ListRowProps {
  label: string;
  icon?: keyof typeof Feather.glyphMap;
  onPress: () => void;
  right?: ReactNode;
  showChevron?: boolean;
}

/** Icon + label + chevron row — account menus, settings lists, any tappable list of options. */
export function ListRow({ label, icon, onPress, right, showChevron = true }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="flex-row items-center gap-2 py-4 min-h-11 border-b border-border/60 data-[active=true]:opacity-85">
      {icon ? <StyledFeather name={icon} size={18} className="text-muted-foreground w-7" /> : null}
      <Text className="text-foreground flex-1" numberOfLines={1}>
        {label}
      </Text>
      {right}
      {showChevron ? <StyledFeather name="chevron-right" size={18} className="text-muted-foreground" /> : null}
    </Pressable>
  );
}
