import { api } from '../client';
import type { CheckoutPayload, Order } from '../types';

export const checkoutApi = {
  /**
   * Snapshots the buyer's current default Address onto each created Order — there is
   * no address_id field. Callers must ensure a default address exists first (the
   * exact error contract for "no default address" is unconfirmed with backend).
   */
  submit: (payload: CheckoutPayload, idempotencyKey: string) =>
    api.post<Order[]>('/api/v1/checkout/', payload, {
      headers: { 'Idempotency-Key': idempotencyKey },
    }),
};
