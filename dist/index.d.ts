export interface SubscriberOptions<T, R> {
    selector?: (state: T) => R;
    comparer?: (a: R, b: R) => boolean;
    emitOnSubscribe?: boolean;
}
export interface UpdateOptions {
    mode?: 'merge' | 'full';
}
export interface Subscriber<T, R> {
    selector: (state: T) => R;
    lastValue: R;
    callback: (newValue: R, prevValue: R | null) => void;
    comparer: (a: R, b: R) => boolean;
}
export declare class SimpleStore<T = any> {
    private _subscribers;
    private _defaultComparer;
    private _defaultSelector;
    state: T;
    emitOnSubscribe: boolean;
    constructor(state: T);
    subscribe<R = T>(callback: (newValue: R, prevValue: R | null) => void, options?: SubscriberOptions<T, R>): () => void;
    update(stateOrFunction: Partial<T> | T | ((state: T) => T), options?: UpdateOptions): void;
}
export default SimpleStore;
