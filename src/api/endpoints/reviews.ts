import { api } from '../client';
import type {
  CursorPaginated,
  MyProductReview,
  MySellerReview,
  ProductReviewCreatePayload,
  PublicReview,
  PublicSellerReview,
  ReviewEligibility,
  ReviewListParams,
  ReviewReportPayload,
  ReviewSubmission,
  ReviewSummary,
  ReviewUpdatePayload,
  SellerReviewCreatePayload,
  SellerReviewSubmission,
} from '../types';

export const reviewsApi = {
  productSummary: (productId: number) =>
    api.get<ReviewSummary>(`/api/v1/reviews/products/${productId}/summary/`, { auth: false }),

  productReviews: (productId: number, params: ReviewListParams = {}) =>
    api.get<CursorPaginated<PublicReview>>(`/api/v1/reviews/products/${productId}/`, {
      auth: false,
      params,
    }),

  sellerSummary: (sellerSlug: string) =>
    api.get<ReviewSummary>(`/api/v1/reviews/sellers/${sellerSlug}/summary/`, { auth: false }),

  sellerReviews: (sellerSlug: string, params: ReviewListParams = {}) =>
    api.get<CursorPaginated<PublicSellerReview>>(`/api/v1/reviews/sellers/${sellerSlug}/`, {
      auth: false,
      params,
    }),

  eligibility: () => api.get<ReviewEligibility>('/api/v1/reviews/mine/eligible/'),

  myProductReviews: (params: ReviewListParams = {}) =>
    api.get<CursorPaginated<MyProductReview>>('/api/v1/reviews/mine/products/', { params }),

  mySellerReviews: (params: ReviewListParams = {}) =>
    api.get<CursorPaginated<MySellerReview>>('/api/v1/reviews/mine/sellers/', { params }),

  submitProductReview: (payload: ProductReviewCreatePayload) =>
    api.post<ReviewSubmission>('/api/v1/reviews/product/', payload),

  updateMyProductReview: (reviewId: number, payload: ReviewUpdatePayload) =>
    api.patch<MyProductReview>(`/api/v1/reviews/mine/products/${reviewId}/`, payload),

  submitSellerReview: (payload: SellerReviewCreatePayload) =>
    api.post<SellerReviewSubmission>('/api/v1/reviews/seller/', payload),

  updateMySellerReview: (reviewId: number, payload: ReviewUpdatePayload) =>
    api.patch<MySellerReview>(`/api/v1/reviews/mine/sellers/${reviewId}/`, payload),

  reportProductReview: (reviewId: number, payload: ReviewReportPayload) =>
    api.post<void>(`/api/v1/reviews/product/${reviewId}/report/`, payload),

  reportSellerReview: (reviewId: number, payload: ReviewReportPayload) =>
    api.post<void>(`/api/v1/reviews/seller/${reviewId}/report/`, payload),
};
