import { MiniStore } from './index.js';

// Inject MiniStore directly into the browser window object
declare global {
  interface Window {
    MiniStore: typeof MiniStore;
  }
}

if (typeof window !== 'undefined') {
  window.MiniStore = MiniStore;
}

export { MiniStore };
