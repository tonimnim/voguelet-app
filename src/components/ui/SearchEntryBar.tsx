import { useRouter } from 'expo-router';

import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { StyledFeather } from '@/src/lib/styledIcons';

/** Non-editable entry point that hands off to the Search tab, where the real input lives. */
export function SearchEntryBar() {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel="Search products, brands, sellers"
      onPress={() => router.push('/(tabs)/search')}
      className="flex-row items-center min-h-11 rounded-md border border-border px-4 data-[active=true]:opacity-85">
      <StyledFeather name="search" size={18} className="text-muted-foreground" />
      <Text className="text-muted-foreground ml-2" numberOfLines={1}>
        Search products, brands, sellers
      </Text>
    </Pressable>
  );
}
