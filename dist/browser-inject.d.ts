import { MiniStore } from './index.js';
declare global {
    interface Window {
        MiniStore: typeof MiniStore;
    }
}
export { MiniStore };
