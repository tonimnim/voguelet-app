import { Box } from '@/components/ui/box';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

const POINTS = [
  {
    title: 'Verified reviews only',
    body: 'Only buyers who completed a purchase can leave a product or seller review.',
  },
  {
    title: 'Private conversations',
    body: "Chat with a seller is private and tied to a specific product or order — it isn't shared publicly.",
  },
  {
    title: 'Your number stays private',
    body: 'Sellers never see your phone number through the app. Delivery contact details are only shared as needed to fulfil an order.',
  },
  {
    title: 'Health & sensitive listings',
    body: 'Products in Women’s Health & Care are reviewed before they go live, and age-restricted listings are marked clearly.',
  },
  {
    title: 'Block or report anyone',
    body: 'You can block a seller or report a conversation or review at any time — see Blocked sellers or use the report action where you see it.',
  },
];

export default function SafetyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScreenHeader title="Safety" />
      <ScrollView contentContainerClassName="p-6 gap-5">
        {POINTS.map((point) => (
          <Box key={point.title}>
            <Text size="lg" bold className="text-foreground">
              {point.title}
            </Text>
            <Text className="text-muted-foreground mt-1">{point.body}</Text>
          </Box>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
