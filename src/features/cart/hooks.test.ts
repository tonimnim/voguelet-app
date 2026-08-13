import type { CartItem } from '@/src/api/types';
import { groupCartItemsBySeller } from './hooks';

function makeItem(overrides: Partial<CartItem>): CartItem {
  return {
    id: 1,
    variant_id: 1,
    sku: 'SKU-1',
    option_values: {},
    unit_price: '100.00',
    available_stock: 5,
    product_title: 'Test product',
    product_slug: 'test-product',
    seller_name: 'Seller A',
    seller_slug: 'seller-a',
    quantity: 1,
    line_total: 100,
    ...overrides,
  };
}

describe('groupCartItemsBySeller', () => {
  it('groups items under their seller', () => {
    const items = [
      makeItem({ id: 1, seller_slug: 'seller-a', seller_name: 'Seller A' }),
      makeItem({ id: 2, seller_slug: 'seller-b', seller_name: 'Seller B' }),
      makeItem({ id: 3, seller_slug: 'seller-a', seller_name: 'Seller A' }),
    ];

    const groups = groupCartItemsBySeller(items);

    expect(groups).toHaveLength(2);
    const sellerA = groups.find((g) => g.sellerSlug === 'seller-a');
    expect(sellerA?.items.map((i) => i.id)).toEqual([1, 3]);
    const sellerB = groups.find((g) => g.sellerSlug === 'seller-b');
    expect(sellerB?.items.map((i) => i.id)).toEqual([2]);
  });

  it('returns an empty array for an empty cart', () => {
    expect(groupCartItemsBySeller([])).toEqual([]);
  });
});
