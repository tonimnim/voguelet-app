import type { NotificationListParams, ProductListParams, ReviewListParams } from './types';

/** Centralized query key factory — keeps invalidation consistent across features. */
export const queryKeys = {
  me: ['me'] as const,

  categories: ['categories'] as const,

  products: (params: ProductListParams = {}) => ['products', params] as const,
  product: (slug: string) => ['product', slug] as const,

  productReviewSummary: (productId: number) => ['reviews', 'product-summary', productId] as const,
  productReviews: (productId: number, params: ReviewListParams = {}) =>
    ['reviews', 'product-list', productId, params] as const,
  sellerReviewSummary: (sellerSlug: string) => ['reviews', 'seller-summary', sellerSlug] as const,
  sellerReviews: (sellerSlug: string, params: ReviewListParams = {}) =>
    ['reviews', 'seller-list', sellerSlug, params] as const,
  reviewEligibility: ['reviews', 'eligibility'] as const,
  myProductReviews: (params: ReviewListParams = {}) => ['reviews', 'mine', 'products', params] as const,
  mySellerReviews: (params: ReviewListParams = {}) => ['reviews', 'mine', 'sellers', params] as const,

  cart: ['cart'] as const,

  addresses: ['addresses'] as const,
  counties: ['counties'] as const,

  orders: ['orders'] as const,
  order: (number: string) => ['order', number] as const,

  conversations: ['conversations'] as const,
  conversation: (id: number) => ['conversation', id] as const,
  messages: (conversationId: number) => ['messages', conversationId] as const,

  notifications: (params: NotificationListParams = {}) => ['notifications', params] as const,
  notificationsUnreadCount: ['notifications', 'unread-count'] as const,
};
