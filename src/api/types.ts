/**
 * Types mirror the Voguelet DRF OpenAPI schema (`GET /api/schema/` on the local backend).
 * Only the surfaces the customer app actually calls are modeled — seller portal, billing,
 * ads, and moderation schemas are intentionally omitted; that surface area is web-only.
 *
 * Keep this file the single source of truth for API shapes — UI components must not
 * redeclare or widen these types.
 */

// ---------- generic envelopes ----------

/** DRF PageNumberPagination envelope (used by /catalog/products/). */
export interface PagePaginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** DRF cursor pagination envelope (used by reviews, notifications, my-reviews). */
export interface CursorPaginated<T> {
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Shape of a DRF error body: either {detail} or per-field validation errors. */
export type ApiErrorBody =
  | { detail: string }
  | { [field: string]: string[] | string };

// ---------- enums ----------

export type ListingPolicy = 'standard' | 'sensitive' | 'regulated';
export type CartStatus = 'active' | 'checked_out' | 'abandoned';
export type OrderStatus = 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type ConversationState = 'open' | 'closed';
export type MessageKind = 'text' | 'auto_reply' | 'system';
export type SenderRole = 'buyer' | 'seller' | 'system';
export type ReviewModerationStatus = 'pending' | 'published' | 'rejected' | 'hidden';
export type ReportReason = 'spam' | 'abuse' | 'misleading' | 'privacy' | 'other';
export type NotificationKind =
  | 'order_placed'
  | 'order_confirmed'
  | 'order_fulfilled'
  | 'order_cancelled'
  | 'order_refunded'
  | 'order_paid'
  | 'message_received'
  | 'review_published'
  | 'review_rejected'
  | 'review_hidden';
export type NotificationGroup = 'order' | 'message' | 'review' | 'other';
export type NotificationTargetType = 'order' | 'conversation' | 'review' | 'product' | '';

// ---------- auth ----------

export interface OtpRequestPayload {
  email: string;
}

export interface OtpRequestResponse {
  detail: string;
  expires_in_seconds: number;
  /** Dev/staging convenience only — never render outside __DEV__. */
  development_code?: string;
}

export interface OtpVerifyPayload {
  email: string;
  code: string;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface OtpVerifyResponse {
  user: CurrentUser;
  tokens: TokenPair;
}

export interface TokenRefreshResponse {
  access: string;
  refresh: string;
}

// ---------- account ----------

export type SellerMembershipRole = 'owner' | 'staff';

export interface SellerMembership {
  seller_id: number;
  seller_name: string;
  seller_slug: string;
  seller_status: string;
  seller_vertical: string;
  role: SellerMembershipRole;
  is_active: boolean;
}

export interface CurrentUser {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  platform_role: string;
  phone_number: string;
  seller_memberships: SellerMembership[];
}

// ---------- catalog ----------

export interface CategoryChild {
  code: string;
  name: string;
  description?: string;
  listing_policy: ListingPolicy;
  minimum_age: number | null;
  is_listable: boolean;
}

export interface Category {
  code: string;
  name: string;
  description?: string;
  listing_policy: ListingPolicy;
  minimum_age: number | null;
  is_listable: boolean;
  children: CategoryChild[];
}

export interface CatalogSeller {
  name: string;
  slug: string;
}

/** category as embedded in a product payload (flattened, includes root vertical) */
export interface CatalogCategory {
  code: string;
  name: string;
  root_code: string;
  root_name: string;
  listing_policy: ListingPolicy;
  minimum_age: number | null;
}

export interface ProductImage {
  id: number;
  url: string;
  alt?: string;
  position?: number;
  created_at: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  /** Freeform per-category axes, e.g. { size: "M", colour: "Black" }. */
  option_values: Record<string, unknown>;
  price: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublicProductList {
  title: string;
  slug: string;
  brand?: string;
  seller: CatalogSeller;
  category: CatalogCategory;
  /** Freeform, category-specific. Render generically — do not hard-code per subtype. */
  attributes: Record<string, unknown>;
  images: ProductImage[];
  price_from: string;
  created_at: string;
}

export interface PublicProductDetail {
  title: string;
  slug: string;
  brand?: string;
  seller: CatalogSeller;
  category: CatalogCategory;
  attributes: Record<string, unknown>;
  images: ProductImage[];
  price_from: string;
  created_at: string;
  description?: string;
  variants: ProductVariant[];
  updated_at: string;
}

export interface ProductListParams {
  category?: string;
  vertical?: string;
  seller?: string;
  search?: string;
  price_min?: number;
  price_max?: number;
  page?: number;
  page_size?: number;
  [key: string]: string | number | boolean | undefined;
}

// ---------- cart ----------

export interface CartItem {
  id: number;
  variant_id: number;
  sku: string;
  option_values: Record<string, unknown>;
  unit_price: string;
  available_stock: number;
  product_title: string;
  product_slug: string;
  seller_name: string;
  seller_slug: string;
  quantity: number;
  line_total: number;
}

export interface Cart {
  id: number;
  status: CartStatus;
  items: CartItem[];
  item_count: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemWritePayload {
  variant_id: number;
  quantity: number;
}

export interface CartItemUpdatePayload {
  quantity: number;
}

// ---------- addresses ----------

export interface County {
  value: string;
  label: string;
}

export interface Address {
  id: number;
  label?: string;
  recipient_name: string;
  phone_number: string;
  /** County code — validate against GET /addresses/counties/, not a hard-coded union. */
  county: string;
  county_name: string;
  town: string;
  address_line: string;
  landmark?: string;
  delivery_notes?: string;
  postal_code?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export type AddressPayload = Omit<
  Address,
  'id' | 'county_name' | 'created_at' | 'updated_at' | 'is_default'
>;

// ---------- checkout / orders ----------

export interface CheckoutPayload {
  idempotency_key?: string;
}

export interface OrderDeliveryAddress {
  address_id: number | null;
  recipient_name: string;
  phone_number: string;
  county: string;
  county_name: string;
  town: string;
  address_line: string;
  landmark: string;
  delivery_notes: string;
  postal_code: string;
}

export interface OrderItem {
  id: number;
  variant_id: number;
  product_title: string;
  sku: string;
  option_values: Record<string, unknown>;
  unit_price: string;
  quantity: number;
  line_total: string;
}

export interface Order {
  number: string; // uuid
  seller_name: string;
  seller_slug: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: string;
  delivery_fee: string;
  total: string;
  delivery_address: OrderDeliveryAddress;
  items: OrderItem[];
  reserved_until: string | null;
  created_at: string;
  updated_at: string;
}

// ---------- reviews ----------

export interface ReviewSummary {
  average_rating: number;
  review_count: number;
  rating_breakdown: Record<string, number>;
}

export interface PublicReview {
  id: number;
  rating: number;
  title?: string;
  body?: string;
  reviewer_name: string;
  verified_purchase: boolean;
  published_at: string | null;
  created_at: string;
}

export type PublicSellerReview = PublicReview;

export interface ReviewProductTarget {
  id: number;
  slug: string;
  title: string;
}

export interface ReviewSellerTarget {
  slug: string;
  name: string;
}

export interface EligibleProductReview {
  order_item_id: number;
  order_number: string;
  product: ReviewProductTarget;
  seller: ReviewSellerTarget;
  review_id: number | null;
}

export interface EligibleSellerReview {
  order_id: number;
  order_number: string;
  seller: ReviewSellerTarget;
  review_id: number | null;
}

export interface ReviewEligibility {
  products: EligibleProductReview[];
  sellers: EligibleSellerReview[];
}

export interface ProductReviewCreatePayload {
  order_item_id: number;
  rating: number;
  title?: string;
  body?: string;
}

export interface SellerReviewCreatePayload {
  order_id: number;
  rating: number;
  title?: string;
  body?: string;
}

export interface ReviewUpdatePayload {
  rating?: number;
  title?: string;
  body?: string;
}

export interface ReviewSubmission {
  id: number;
  rating: number;
  title?: string;
  body?: string;
  status: ReviewModerationStatus;
  created_at: string;
}

export type SellerReviewSubmission = ReviewSubmission;

export interface MyProductReview {
  id: number;
  order_item: number;
  order_number: string;
  product_title: string;
  product_slug: string;
  seller_name: string;
  seller_slug: string;
  rating: number;
  title?: string;
  body?: string;
  status: ReviewModerationStatus;
  moderation_note?: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MySellerReview {
  id: number;
  order: number;
  order_number: string;
  seller_name: string;
  seller_slug: string;
  rating: number;
  title?: string;
  body?: string;
  status: ReviewModerationStatus;
  moderation_note?: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewReportPayload {
  reason: ReportReason;
  details?: string;
}

export interface ReviewListParams {
  rating?: 1 | 2 | 3 | 4 | 5;
  cursor?: string;
  page_size?: number;
  [key: string]: string | number | boolean | undefined;
}

// ---------- chat ----------

/** Deliberately excludes username/email/phone from conversation payloads. */
export interface Participant {
  id: number;
}

export interface ConversationSeller {
  id: number;
  name: string;
  slug: string;
  is_online: boolean;
  response_time_label: string;
}

export interface ConversationProduct {
  slug: string;
  title: string;
  image_url: string;
}

export interface Conversation {
  id: number;
  buyer: Participant;
  seller: ConversationSeller;
  seller_id: number;
  product: ConversationProduct | null;
  product_slug: string | null;
  order_id: number | null;
  state: ConversationState;
  last_message_at: string | null;
  last_message_preview: string;
  last_message_sender_id: number | null;
  unread_count: number;
  quick_replies: string[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  sender: Participant;
  sender_role: SenderRole;
  sender_label: string;
  kind: MessageKind;
  is_automated: boolean;
  body: string;
  created_at: string;
  read_at: string | null;
}

export interface MessageCreatePayload {
  body: string;
}

export interface ProductInquiryPayload {
  product_slug: string;
  body: string;
}

export interface ConversationReportPayload {
  reason: ReportReason;
  details?: string;
}

export interface ConversationReadResponse {
  marked_read: number;
}

// ---------- notifications ----------

export interface Notification {
  id: number;
  kind: NotificationKind;
  group: NotificationGroup;
  title: string;
  body: string;
  target_type: NotificationTargetType;
  target_id?: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface UnreadCountResponse {
  unread_count: number;
}

export interface MarkedReadResponse {
  marked_read: number;
}

export interface NotificationListParams {
  unread_only?: boolean;
  cursor?: string;
  page_size?: number;
  [key: string]: string | number | boolean | undefined;
}
