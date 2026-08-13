import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

// There is no general-purpose "contact support" endpoint on the backend yet —
// only conversation reports and review reports, both tied to a specific ID.
// This screen points to those specific flows honestly rather than presenting
// a submit button that has nowhere to send its payload.
export default function ReportIssueScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Report an issue" />
      <Box className="p-6 gap-3">
        <Text className="text-muted-foreground">For a specific problem, report it from where it happened:</Text>
        <Text className="text-foreground">
          {'• A message — open the conversation and use Report\n'}
          {'• A review — open the review and use Report\n'}
          {'• A seller — block them from your conversation with them'}
        </Text>
        <Text size="xs" className="text-muted-foreground mt-3">
          A general contact channel for anything else will be added here once it&rsquo;s available.
        </Text>
      </Box>
    </SafeAreaView>
  );
}
