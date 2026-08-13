import { SafeAreaView } from '@/components/ui/safe-area-view';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

// NOTE: the backend's Conversation schema has no `is_blocked` field or list filter yet
// (block/unblock endpoints exist, but there's nowhere to read the blocked state back).
// This screen is honest about that rather than guessing — it will list blocked sellers
// as soon as that field ships. See the handoff notes for the backend ask.
export default function BlockedSellersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Blocked sellers" />
      <EmptyState
        title="Coming soon"
        message="Sellers you block from a conversation will be listed here once the backend exposes blocked status."
      />
    </SafeAreaView>
  );
}
