import { useQuery } from '@tanstack/react-query';

import { chatApi } from '@/src/api/endpoints/chat';
import { queryKeys } from '@/src/api/queryKeys';

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: () => chatApi.conversations(),
    refetchInterval: 30_000, // REST-polled inbox until WebSocket ships (Build Phase 5).
  });
}
