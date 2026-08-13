import { useRouter } from 'expo-router';
import type { Feather } from '@expo/vector-icons';

import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { Button } from '@/src/components/ui/Button';
import { ListRow } from '@/src/components/ui/ListRow';
import { useLogout } from '@/src/features/auth/hooks';
import { useAuthStore } from '@/src/stores/authStore';

const MENU: { label: string; icon: keyof typeof Feather.glyphMap; href: string }[] = [
  { label: 'Saved addresses', icon: 'map-pin', href: '/addresses' },
  { label: 'Orders', icon: 'package', href: '/orders' },
  { label: 'Notifications', icon: 'bell', href: '/notifications' },
  { label: 'Help', icon: 'help-circle', href: '/account/help' },
  { label: 'Safety', icon: 'shield', href: '/account/safety' },
  { label: 'Blocked sellers', icon: 'slash', href: '/account/blocked-sellers' },
  { label: 'Report an issue', icon: 'flag', href: '/account/report-issue' },
];

export default function AccountScreen() {
  const router = useRouter();
  const isGuest = useAuthStore((s) => s.status === 'signedOut');
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView contentContainerClassName="p-6 pb-12">
        <Text size="2xl" bold className="text-foreground">
          Account
        </Text>

        {isGuest ? (
          <Box className="mt-5 p-4 rounded bg-muted">
            <Text bold className="text-foreground">
              You&apos;re browsing as a guest
            </Text>
            <Text size="xs" className="text-muted-foreground mt-0.5">
              Sign in to chat with sellers, leave reviews, and check out.
            </Text>
            <Box className="mt-4">
              <Button label="Sign in" onPress={() => router.push('/(auth)/welcome')} />
            </Box>
          </Box>
        ) : (
          <Box className="mt-5 p-4 rounded bg-muted">
            <Text bold className="text-foreground">
              {user?.email || user?.username || 'Signed in'}
            </Text>
            {user?.phone_number ? (
              <Text size="xs" className="text-muted-foreground mt-0.5">
                {user.phone_number}
              </Text>
            ) : null}
          </Box>
        )}

        <Box className="mt-6">
          {MENU.map((item) => (
            <ListRow key={item.href} label={item.label} icon={item.icon} onPress={() => router.push(item.href as never)} />
          ))}
        </Box>

        <Box className={`mt-8 ${isGuest ? 'hidden' : ''}`}>
          <Button label="Sign out" variant="secondary" loading={logout.isPending} onPress={() => logout.mutate()} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
