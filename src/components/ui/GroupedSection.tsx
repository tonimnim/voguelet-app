import type { ReactNode } from 'react';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface GroupedSectionProps {
  title: string;
  children: ReactNode;
}

/** A titled block within a list — e.g. cart/checkout items grouped by seller. */
export function GroupedSection({ title, children }: GroupedSectionProps) {
  return (
    <Box>
      <Text bold className="text-foreground mb-2">
        {title}
      </Text>
      {children}
    </Box>
  );
}
