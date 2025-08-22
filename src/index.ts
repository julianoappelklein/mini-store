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

export class MiniStore<T = any> {
  private _subscribers = new Set<Subscriber<T, any>>();
  private _defaultComparer = <R>(a: R, b: R): boolean => a === b;
  private _defaultSelector = <R>(state: T): R => state as unknown as R;
  
  public state: T;
  public emitOnSubscribe: boolean = true;

  constructor(state: T) {
    this.state = state;
  }

  subscribe<R = T>(
    callback: (newValue: R, prevValue: R | null) => void,
    options: SubscriberOptions<T, R> = {}
  ): () => void {
    const { selector: argumentSelector, comparer: argumentComparer, emitOnSubscribe } = options;

    const selector = argumentSelector ? (state: T): R => {
      try {
        return argumentSelector(state);
      } catch (error) {
        console.error('Error in selector:', error, state);
        return null as R;
      }
    } : this._defaultSelector;

    const comparer = argumentComparer ? (a: R, b: R): boolean => {
      try {
        return argumentComparer(a, b);
      } catch (error) {
        console.error('Error in comparer:', error, a, b);
        return false; // treat as changed
      }
    } : this._defaultComparer;
    
    const subscriber: Subscriber<T, R> = {
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

  update(stateOrFunction: Partial<T> | T | ((state: T) => T), options: UpdateOptions = {}): void {
    console.log('Updating state:', stateOrFunction);
    
    const { mode = 'merge' } = options;
    let newState: T;

    if (typeof stateOrFunction === 'function') {
      newState = (stateOrFunction as (state: T) => T)(this.state);
    } else if (mode === 'merge') {
      newState = { ...this.state as any, ...stateOrFunction as any } as T;
    } else if (mode === 'full') {
      newState = stateOrFunction as T;
    } else {
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
      } catch (err) {
        console.error('Error in subscriber callback:', err);
      }
    });
  }
}

export default MiniStore;
