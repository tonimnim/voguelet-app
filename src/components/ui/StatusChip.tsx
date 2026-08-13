import type { Feather } from '@expo/vector-icons';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { StyledFeather } from '@/src/lib/styledIcons';

type Tone = 'neutral' | 'positive' | 'warning' | 'negative';

interface StatusChipProps {
  label: string;
  tone?: Tone;
  icon?: keyof typeof Feather.glyphMap;
}

// No dedicated "warning" token exists yet — reads as neutral until one's added.
const TONE_CLASS: Record<Tone, string> = {
  neutral: 'text-muted-foreground',
  positive: 'text-success',
  warning: 'text-muted-foreground',
  negative: 'text-destructive',
};

/** Status is always communicated by icon + label together, never color alone. */
export function StatusChip({ label, tone = 'neutral', icon }: StatusChipProps) {
  const toneClass = TONE_CLASS[tone];

  return (
    <Box className="flex-row items-center self-start px-2 py-1 rounded-md border border-border/60">
      {icon ? <StyledFeather name={icon} size={13} className={`${toneClass} mr-1`} /> : null}
      <Text size="xs" bold className={toneClass}>
        {label}
      </Text>
    </Box>
  );
}
