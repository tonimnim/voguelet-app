import { api } from '../client';
import type {
  Conversation,
  ConversationReadResponse,
  ConversationReportPayload,
  Message,
  MessageCreatePayload,
  ProductInquiryPayload,
} from '../types';

export const chatApi = {
  conversations: () => api.get<Conversation[]>('/api/v1/chat/conversations/'),

  conversation: (id: number) => api.get<Conversation>(`/api/v1/chat/conversations/${id}/`),

  messages: (conversationId: number) =>
    api.get<Message[]>(`/api/v1/chat/conversations/${conversationId}/messages/`),

  sendMessage: (conversationId: number, payload: MessageCreatePayload) =>
    api.post<Message>(`/api/v1/chat/conversations/${conversationId}/messages/`, payload),

  markRead: (conversationId: number) =>
    api.post<ConversationReadResponse>(`/api/v1/chat/conversations/${conversationId}/read/`),

  report: (conversationId: number, payload: ConversationReportPayload) =>
    api.post<void>(`/api/v1/chat/conversations/${conversationId}/report/`, payload),

  block: (conversationId: number) => api.post<void>(`/api/v1/chat/conversations/${conversationId}/block/`),

  unblock: (conversationId: number) => api.delete<void>(`/api/v1/chat/conversations/${conversationId}/block/`),

  startProductInquiry: (payload: ProductInquiryPayload) =>
    api.post<Conversation>('/api/v1/chat/inquiries/', payload),
};
