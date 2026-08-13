// Metro/expo-cli injects EXPO_PUBLIC_* vars from .env at dev-server start; Jest
// doesn't go through that path, so provide a harmless default for unit tests
// that import src/lib/env.ts transitively (e.g. via the API client).
process.env.EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';
