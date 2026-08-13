import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { iconForCategory } from '@/src/features/catalog/categoryIcons';
import { StyledFeather } from '@/src/lib/styledIcons';

interface CategoryAvatarProps {
  code: string;
  name: string;
  onPress: () => void;
}

/** Icon-in-a-circle + label — the category rail on Home, and (later) category landing pages. */
export function CategoryAvatar({ code, name, onPress }: CategoryAvatarProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      className="w-[72px] items-center data-[active=true]:opacity-85">
      <Box className="h-14 w-14 rounded-full items-center justify-center bg-muted">
        <StyledFeather name={iconForCategory(code)} size={22} className="text-foreground" />
      </Box>
      <Text size="xs" className="text-muted-foreground mt-2 text-center" numberOfLines={2} maxFontSizeMultiplier={1.4}>
        {name}
      </Text>
    </Pressable>
  );
}
