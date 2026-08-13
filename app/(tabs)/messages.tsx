import { useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { FlatList } from '@/components/ui/flat-list';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { LoadingState } from '@/src/components/ui/LoadingState';
import { useConversations } from '@/src/features/chat/hooks';
import { useAuthStore } from '@/src/stores/authStore';

export default function MessagesScreen() {
  const router = useRouter();
  const isGuest = useAuthStore((s) => s.status === 'signedOut');

  if (isGuest) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <Text size="2xl" bold className="text-foreground px-6 pt-6 pb-2">
          Messages
        </Text>
        <EmptyState
          title="Sign in to chat with sellers"
          message="Questions about a product or order go straight to the seller once you're signed in."
        />
        <Box className="px-6">
          <Button label="Sign in" onPress={() => router.push('/(auth)/welcome')} />
        </Box>
      </SafeAreaView>
    );
  }

  return <SignedInMessages />;
}

function SignedInMessages() {
  const router = useRouter();
  const conversationsQuery = useConversations();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text size="2xl" bold className="text-foreground px-6 pt-6 pb-2">
        Messages
      </Text>

      {conversationsQuery.isPending ? (
        <LoadingState />
      ) : conversationsQuery.isError ? (
        <ErrorState onRetry={() => conversationsQuery.refetch()} />
      ) : conversationsQuery.data.length === 0 ? (
        <EmptyState
          title="No conversations yet"
          message="Questions to a seller about a product or order will show up here."
        />
      ) : (
        <FlatList
          data={conversationsQuery.data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({ pathname: '/conversations/[id]', params: { id: String(item.id) } } as never)
              }
              className="flex-row items-center px-6 py-4 min-h-11 border-b border-border/60 data-[active=true]:opacity-85">
              <Box className="flex-1">
                <Text bold className="text-foreground" numberOfLines={1}>
                  {item.seller.name}
                </Text>
                <Text size="xs" className="text-muted-foreground mt-0.5" numberOfLines={1}>
                  {item.last_message_preview || 'Start the conversation'}
                </Text>
              </Box>
              {item.unread_count > 0 ? (
                <Box className="min-w-[22px] h-[22px] rounded-full items-center justify-center px-1.5 bg-primary">
                  <Text size="xs" bold className="text-primary-foreground">
                    {item.unread_count}
                  </Text>
                </Box>
              ) : null}
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
