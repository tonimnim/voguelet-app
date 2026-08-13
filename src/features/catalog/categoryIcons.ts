import { Feather } from '@expo/vector-icons';

type FeatherName = keyof typeof Feather.glyphMap;

/**
 * Best-effort icon per known category code — purely decorative navigation aid.
 * Categories have no image field in the API, so this is a small hand-maintained
 * map rather than per-subtype components. Falls back to a generic icon for any
 * category code we don't recognise yet, so a new backend category never breaks.
 */
const ICONS: Record<string, FeatherName> = {
  'fashion-clothing': 'shopping-bag',
  'fashion-bags-shoes-accessories': 'briefcase',
  'beauty-face-makeup': 'droplet',
  'beauty-hair-body': 'wind',
  'beauty-fragrance-feminine-care': 'feather',
  'beauty-intimate-wellness': 'heart',
  'health-everyday-supplements': 'plus-circle',
  'health-women-health-testing': 'activity',
  'health-medicines-treatments': 'thermometer',
};

export function iconForCategory(code: string): FeatherName {
  return ICONS[code] ?? 'grid';
}
