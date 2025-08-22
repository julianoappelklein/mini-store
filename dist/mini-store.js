'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class MiniStore {
    constructor(state) {
        this._subscribers = new Set();
        this._defaultComparer = (a, b) => a === b;
        this._defaultSelector = (state) => state;
        this.emitOnSubscribe = true;
        this.state = state;
    }
    subscribe(callback, options = {}) {
        const { selector: argumentSelector, comparer: argumentComparer, emitOnSubscribe } = options;
        const selector = argumentSelector ? (state) => {
            try {
                return argumentSelector(state);
            }
            catch (error) {
                console.error('Error in selector:', error, state);
                return null;
            }
        } : this._defaultSelector;
        const comparer = argumentComparer ? (a, b) => {
            try {
                return argumentComparer(a, b);
            }
            catch (error) {
                console.error('Error in comparer:', error, a, b);
                return false; // treat as changed
            }
        } : this._defaultComparer;
        const subscriber = {
            selector,
            lastValue: selector(this.state),
            callback,
            comparer
        };
        this._subscribers.add(subscriber);
        if (emitOnSubscribe !== undefined ? emitOnSubscribe : this.emitOnSubscribe) {
            callback(subscriber.lastValue, null);
        }
        return () => {
            this._subscribers.delete(subscriber);
        };
    }
    update(stateOrFunction, options = {}) {
        console.log('Updating state:', stateOrFunction);
        const { mode = 'merge' } = options;
        let newState;
        if (typeof stateOrFunction === 'function') {
            newState = stateOrFunction(this.state);
        }
        else if (mode === 'merge') {
            newState = Object.assign(Object.assign({}, this.state), stateOrFunction);
        }
        else if (mode === 'full') {
            newState = stateOrFunction;
        }
        else {
            throw new Error(`Unknown update mode: ${mode}`);
        }
        this.state = newState;
        this._subscribers.forEach((subscriber) => {
            try {
                const prevValue = subscriber.lastValue;
                const newValue = subscriber.selector(this.state);
                const comparerResult = subscriber.comparer(prevValue, newValue);
                if (!comparerResult) {
                    subscriber.lastValue = newValue;
                    subscriber.callback(newValue, prevValue);
                }
            }
            catch (err) {
                console.error('Error in subscriber callback:', err);
            }
        });
    }
}

exports.MiniStore = MiniStore;
exports.default = MiniStore;
//# sourceMappingURL=mini-store.js.map
