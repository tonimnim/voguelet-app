/**
 * A handful of raw hex values for the few places that need a literal color
 * string rather than a Tailwind className — react-navigation's tab bar options
 * (tabBarActiveTintColor, tabBarStyle, ...) configure a native tab bar outside
 * the JSX tree NativeWind can reach. Keep in sync with global.css's :root block.
 * Light-only, matching v1 (see global.css for the dark values, unused for now).
 */
export const rawColors = {
  foreground: '#2A2A2A',
  mutedForeground: '#9C9EA0',
  background: '#FFFFFF',
  border: '#B7B9B9',
};
