/**
 * Tiny pub/sub so the API client (which must not import navigation/UI) can announce
 * that the session has expired. The auth store subscribes and drives the redirect.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

export const authEvents = {
  onSessionExpired(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  emitSessionExpired(): void {
    listeners.forEach((listener) => listener());
  },
};
