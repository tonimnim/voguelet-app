import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

const TOPICS = [
  {
    title: 'Tracking an order',
    body: 'Open Account → Orders and select the order. You will see its current status there.',
  },
  {
    title: 'Contacting a seller',
    body: 'Open a product and tap "Ask seller", or continue an existing thread from the Messages tab.',
  },
  {
    title: 'Returns and refunds',
    body: 'Refund and return terms are set per seller. Start with the seller via chat, referencing your order.',
  },
  {
    title: 'Reporting a problem',
    body: 'You can report a conversation, a review, or a seller from wherever you encounter it, or use Report an issue in Account.',
  },
];

export default function HelpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Help" />
      <ScrollView contentContainerClassName="p-6 gap-5">
        {TOPICS.map((topic) => (
          <Box key={topic.title}>
            <Text size="lg" bold className="text-foreground">
              {topic.title}
            </Text>
            <Text className="text-muted-foreground mt-1">{topic.body}</Text>
          </Box>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
