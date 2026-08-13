# Voguelet — Customer Mobile App

React Native + Expo customer app for Voguelet, consuming the Django REST API at `/api/v1/`.
This repo is customer-only: no seller portal, ops dashboard, billing, ads, or admin
functionality lives here — that's the web product.

## Stack

- Expo + React Native + TypeScript, [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- [TanStack Query](https://tanstack.com/query) for all server state (caching, pagination, retries)
- [Zustand](https://zustand-demo.pmnd.rs/) for small local UI state only (never tokens or server data)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms and validation
- Expo SecureStore for JWT storage
- Expo Notifications behind an abstraction (no push credentials wired up yet)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env file and point it at your backend:
   ```bash
   cp .env.example .env
   ```
   The backend runs locally via Docker Compose in the backend repo (`docker compose up`),
   exposing the API on `:8000`. Set `EXPO_PUBLIC_API_BASE_URL` per platform:
   - iOS simulator: `http://localhost:8000`
   - Android emulator: `http://10.0.2.2:8000`
   - Physical device (Expo Go, same network): `http://<your-machine-LAN-IP>:8000`

   Never point this at the production Railway URL during development — production
   currently lags local by whole features (addresses, notifications, etc. are
   local-only as of this writing).
3. Start the dev server:
   ```bash
   npm start
   ```
   Then press `i` (iOS), `a` (Android), or `w` (web).

## Project structure

```
app/            Expo Router routes — thin screens only, no business logic
src/api/        Typed API client (auth, refresh, pagination, cancellation) + one
                module per backend domain, plus types mirroring the OpenAPI schema
src/features/   One folder per domain (auth, catalog, cart, ...), each with
                TanStack Query hooks and any domain-specific components
src/components/ui/  Shared, generic UI components (Button, TextField, EmptyState, ...)
src/theme/      Design tokens (colors, spacing, type scale) and the useThemeColors hook
src/stores/     Zustand stores — small local UI/session-routing state only
src/lib/        SecureStore wrapper, env access, auth-expiry event bus, query client
```

See the plan doc used to build this (API contract map, folder rationale, and the
list of backend gaps) for full detail on why things are shaped this way.

## API client

`src/api/client.ts` is the single source of truth for talking to the backend:
injects the bearer token, retries a request once after a transparent token
refresh on 401 (then routes to sign-in if refresh also fails), normalizes DRF
error bodies into `ApiError`, and forwards `AbortSignal` for query cancellation.
Domain modules in `src/api/endpoints/` wrap it with typed methods — UI code
should never call `fetch` or `src/api/client` directly.

Pagination is endpoint-aware: products use page-number pagination
(`count/next/previous/results`), reviews/notifications use cursor pagination
(`next/previous/results` + `cursor`), and cart/orders/categories/conversations
return plain arrays or a single object.

## Known backend gaps

Tracked in detail in the build plan; the short version:
- `PATCH /api/v1/me/` doesn't exist yet — profile name editing has nowhere to submit to.
- `Conversation` has no `is_blocked` field/filter — "Blocked sellers" can't be listed yet.
- Checkout's "no default address" error contract is unconfirmed.
- No device push-token registration endpoint (expected — push isn't wired up yet).
- The catalog currently has 0 seeded products in both local and production, so
  discovery/PDP/cart/checkout can't be visually verified end-to-end until a few
  products exist.
- The local backend has no CORS configuration: direct navigation to
  `http://localhost:8000/api/v1/...` works, but a cross-origin `fetch()` from
  `expo start --web` (e.g. `http://localhost:8081`) fails outright — no
  `Access-Control-Allow-Origin` at all, not just a mismatched one. This only
  affects the web preview channel (native iOS/Android/Expo Go isn't subject to
  browser CORS), but it blocks visually verifying data-driven screens via a
  browser. Needs `django-cors-headers` with the Expo web dev origins allowed
  for local development.
- Sign-in is moving to Google + Apple (replacing/supplementing email OTP as the
  primary flow) — the backend currently only exposes email OTP
  (`/auth/otp/request/`, `/auth/otp/verify/`). Needs a Google/Apple ID-token
  exchange endpoint (verify the provider token server-side, return the same
  `{user, tokens}` shape as OTP verify) before this can be wired up. Sign-in
  screens are intentionally not being (re)designed yet, pending that.

## Status

Build is in progress, following the phased sequence: (1) setup/auth — in progress,
(2) discovery, (3) cart/checkout/orders, (4) reviews, (5) chat/notifications,
(6) accessibility/polish/tests. This README will be updated with the full route
map and remaining gaps as each phase lands.
