import { SimpleStore } from './index.js';
declare global {
    interface Window {
        SimpleStore: typeof SimpleStore;
    }
}
export { SimpleStore };
