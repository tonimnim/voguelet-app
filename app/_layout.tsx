import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useAuthBootstrap } from '@/src/features/auth/hooks';
import { queryClient } from '@/src/lib/queryClient';
import { useAuthStore } from '@/src/stores/authStore';
import { rawColors } from '@/src/theme/rawColors';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    // v1 ships light-only by design — dark mode is planned for v2 (see global.css).
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <AuthGate />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

function AuthGate() {
  useAuthBootstrap();
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status !== 'loading') {
      SplashScreen.hideAsync();
    }
  }, [status]);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: rawColors.background },
        }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
