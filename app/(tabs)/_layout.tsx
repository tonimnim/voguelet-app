import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { rawColors } from '@/src/theme/rawColors';

/**
 * Browsing needs no account: Home/Search/Cart/Messages/Account are all reachable
 * signed out. Cart and "liking" a product work off a local, on-device store for
 * guests (see src/stores/guestCartStore.ts, src/stores/wishlistStore.ts) and
 * merge into the real account on sign-in. Messages and write-a-review actions
 * require sign-in — enforced where those actions live, not at the tab level.
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: rawColors.foreground,
        tabBarInactiveTintColor: rawColors.mutedForeground,
        tabBarStyle: {
          backgroundColor: rawColors.background,
          borderTopColor: rawColors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => <Feather name="shopping-bag" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <Feather name="message-circle" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
