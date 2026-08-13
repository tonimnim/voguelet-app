const rawBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!rawBaseUrl) {
  throw new Error(
    'EXPO_PUBLIC_API_BASE_URL is not set. Copy .env.example to .env and point it at your API ' +
      '(e.g. http://localhost:8000 on iOS simulator, http://10.0.2.2:8000 on Android emulator, ' +
      'or your machine\'s LAN IP on a physical device).'
  );
}

export const env = {
  apiBaseUrl: rawBaseUrl.replace(/\/+$/, ''),
  isDev: __DEV__,
};
