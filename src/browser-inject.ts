import { SimpleStore } from './index.js';

// Inject SimpleStore directly into the browser window object
declare global {
  interface Window {
    SimpleStore: typeof SimpleStore;
  }
}

if (typeof window !== 'undefined') {
  window.SimpleStore = SimpleStore;
}

export { SimpleStore };
