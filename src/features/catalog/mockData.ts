import type { Category, PublicProductList } from '@/src/api/types';

/**
 * DESIGN-PREVIEW MOCK DATA ONLY.
 *
 * The real /catalog/categories/ and /catalog/products/ calls fail in this web
 * preview (the local backend has no CORS config yet — see README "Known
 * backend gaps"), and the catalog has 0 seeded products regardless. Rather
 * than showing a wall of error/empty states while we iterate on layout, Home
 * renders this static data instead of calling useCategories()/useProducts().
 *
 * MOCK_CATEGORIES mirrors the real /catalog/categories/ response captured
 * during development (see the build plan) — it'll drift if backend categories
 * change, which is fine for a design preview. MOCK_PRODUCTS is invented
 * placeholder content, deliberately kept to non-sensitive categories.
 *
 * Remove this file's usage (swap back to the real hooks) once we're building
 * against the wired-up API — see app/(tabs)/index.tsx.
 */

export const MOCK_CATEGORIES: Category[] = [
  {
    code: 'fashion',
    name: 'Fashion',
    description: 'Women-first clothing, bags, shoes, and accessories.',
    listing_policy: 'standard',
    minimum_age: null,
    is_listable: false,
    children: [
      {
        code: 'fashion-clothing',
        name: 'Clothing',
        description: 'Everyday, occasion, modest, maternity, and active clothing.',
        listing_policy: 'standard',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'fashion-bags-shoes-accessories',
        name: 'Bags, Shoes & Accessories',
        description: 'Bags, footwear, jewellery, scarves, and fashion accessories.',
        listing_policy: 'standard',
        minimum_age: null,
        is_listable: true,
      },
    ],
  },
  {
    code: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    description: 'Beauty, hair, fragrance, feminine care, and intimate wellness.',
    listing_policy: 'standard',
    minimum_age: null,
    is_listable: false,
    children: [
      {
        code: 'beauty-face-makeup',
        name: 'Face & Beauty',
        description: 'Skincare, makeup, nails, and beauty tools.',
        listing_policy: 'standard',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'beauty-hair-body',
        name: 'Hair & Body',
        description: 'Haircare, wigs, extensions, body care, and nail care.',
        listing_policy: 'standard',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'beauty-fragrance-feminine-care',
        name: 'Fragrance & Feminine Care',
        description: 'Fragrance and non-medicated period, postpartum, and external intimate-care products.',
        listing_policy: 'standard',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'beauty-intimate-wellness',
        name: 'Intimate Wellness',
        description: 'Age-restricted sexual wellness products and intimate devices.',
        listing_policy: 'sensitive',
        minimum_age: 18,
        is_listable: true,
      },
    ],
  },
  {
    code: 'health-pharmacy',
    name: 'Health & Pharmacy',
    description: 'Health products, testing, treatments, and pharmacy-led listings.',
    listing_policy: 'standard',
    minimum_age: null,
    is_listable: false,
    children: [
      {
        code: 'health-everyday-supplements',
        name: 'Everyday Health & Supplements',
        description: 'Vitamins, supplements, and everyday health products requiring review.',
        listing_policy: 'regulated',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'health-women-health-testing',
        name: "Women's Health & Testing",
        description: 'Pregnancy and ovulation tests, health devices, and reproductive-health products.',
        listing_policy: 'regulated',
        minimum_age: null,
        is_listable: true,
      },
      {
        code: 'health-medicines-treatments',
        name: 'Medicines & Treatments',
        description: 'OTC, prescription, fertility, contraception, and medicated intimate products.',
        listing_policy: 'regulated',
        minimum_age: null,
        is_listable: true,
      },
    ],
  },
];

/** Flat abstract swatch (not a fake photo) so the card's image area previews at full size. */
function placeholderSwatch(tone: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="533" viewBox="0 0 400 533">` +
    `<rect width="400" height="533" fill="${tone}"/>` +
    `<circle cx="200" cy="290" r="86" fill="rgba(255,255,255,0.4)"/>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Neutral swatches for placeholder art only — not brand tokens, just visual variety.
const SWATCHES = ['#EFEFEF', '#B7B9B9', '#DCD7CE', '#C9CFC6', '#E3D9D2', '#D6D3CE'];

function mockProduct(
  index: number,
  fields: Pick<PublicProductList, 'title' | 'slug' | 'brand' | 'price_from'> & {
    sellerName: string;
    sellerSlug: string;
    categoryCode: string;
    categoryName: string;
    rootCode: string;
    rootName: string;
  }
): PublicProductList {
  return {
    title: fields.title,
    slug: fields.slug,
    brand: fields.brand,
    seller: { name: fields.sellerName, slug: fields.sellerSlug },
    category: {
      code: fields.categoryCode,
      name: fields.categoryName,
      root_code: fields.rootCode,
      root_name: fields.rootName,
      listing_policy: 'standard',
      minimum_age: null,
    },
    attributes: {},
    images: [
      {
        id: index,
        url: placeholderSwatch(SWATCHES[index % SWATCHES.length]),
        created_at: new Date(0).toISOString(),
      },
    ],
    price_from: fields.price_from,
    created_at: new Date(0).toISOString(),
  };
}

export const MOCK_PRODUCTS: PublicProductList[] = [
  mockProduct(0, {
    title: 'Wrap Midi Dress',
    slug: 'wrap-midi-dress',
    brand: 'Aya Studio',
    price_from: '4200.00',
    sellerName: 'The Fold Nairobi',
    sellerSlug: 'the-fold-nairobi',
    categoryCode: 'fashion-clothing',
    categoryName: 'Clothing',
    rootCode: 'fashion',
    rootName: 'Fashion',
  }),
  mockProduct(1, {
    title: 'Structured Leather Tote',
    slug: 'structured-leather-tote',
    brand: 'Nyota Leather',
    price_from: '6800.00',
    sellerName: 'Nyota Leather Co.',
    sellerSlug: 'nyota-leather-co',
    categoryCode: 'fashion-bags-shoes-accessories',
    categoryName: 'Bags, Shoes & Accessories',
    rootCode: 'fashion',
    rootName: 'Fashion',
  }),
  mockProduct(2, {
    title: 'Vitamin C Brightening Serum, 30ml',
    slug: 'vitamin-c-brightening-serum-30ml',
    brand: 'Kito Skin',
    price_from: '2450.00',
    sellerName: 'Kito Botanicals',
    sellerSlug: 'kito-botanicals',
    categoryCode: 'beauty-face-makeup',
    categoryName: 'Face & Beauty',
    rootCode: 'beauty-personal-care',
    rootName: 'Beauty & Personal Care',
  }),
  mockProduct(3, {
    title: 'Silk Press Argan Oil',
    slug: 'silk-press-argan-oil',
    brand: 'Coily & Co',
    price_from: '1800.00',
    sellerName: 'Coily & Co',
    sellerSlug: 'coily-and-co',
    categoryCode: 'beauty-hair-body',
    categoryName: 'Hair & Body',
    rootCode: 'beauty-personal-care',
    rootName: 'Beauty & Personal Care',
  }),
  mockProduct(4, {
    title: 'Amber Oud Eau de Parfum, 50ml',
    slug: 'amber-oud-eau-de-parfum-50ml',
    brand: 'Maison Amani',
    price_from: '5200.00',
    sellerName: 'Maison Amani',
    sellerSlug: 'maison-amani',
    categoryCode: 'beauty-fragrance-feminine-care',
    categoryName: 'Fragrance & Feminine Care',
    rootCode: 'beauty-personal-care',
    rootName: 'Beauty & Personal Care',
  }),
  mockProduct(5, {
    title: 'Prenatal Multivitamin, 60 Capsules',
    slug: 'prenatal-multivitamin-60-capsules',
    brand: 'Verdant Health',
    price_from: '1950.00',
    sellerName: 'Verdant Pharmacy',
    sellerSlug: 'verdant-pharmacy',
    categoryCode: 'health-everyday-supplements',
    categoryName: 'Everyday Health & Supplements',
    rootCode: 'health-pharmacy',
    rootName: 'Health & Pharmacy',
  }),
];
