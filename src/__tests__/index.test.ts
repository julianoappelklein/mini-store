import { SimpleStore } from '../index';

describe('SimpleStore', () => {
  let store: SimpleStore<{ count: number; name: string }>;

  beforeEach(() => {
    store = new SimpleStore({ count: 0, name: 'test' });
  });

  describe('constructor', () => {
    it('should initialize with provided state', () => {
      expect(store.state).toEqual({ count: 0, name: 'test' });
    });
  });

  describe('subscribe', () => {
  it('should call callback when state changes', () => {
    const callback = jest.fn();
    store.subscribe(callback);

    // Clear the initial call
    callback.mockClear();

    store.update({ count: 1 });

    expect(callback).toHaveBeenCalledWith({ count: 1, name: 'test' }, { count: 0, name: 'test' });
  });    it('should emit on subscribe by default', () => {
      const callback = jest.fn();
      store.subscribe(callback);

      expect(callback).toHaveBeenCalledWith({ count: 0, name: 'test' }, null);
    });

    it('should not emit on subscribe when emitOnSubscribe is false', () => {
      const callback = jest.fn();
      store.subscribe(callback, { emitOnSubscribe: false });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should work with selector', () => {
      const callback = jest.fn();
      store.subscribe(callback, { selector: state => state.count });

      store.update({ count: 5 });

      expect(callback).toHaveBeenCalledWith(5, 0);
    });

    it('should not call callback when selected value does not change', () => {
      const callback = jest.fn();
      store.subscribe(callback, { selector: state => state.count });

      // Clear the initial call
      callback.mockClear();

      store.update({ name: 'changed' });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should return unsubscribe function', () => {
      const callback = jest.fn();
      const unsubscribe = store.subscribe(callback);

      unsubscribe();
      store.update({ count: 1 });

      // Should only have been called once (on initial subscribe)
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle custom comparer', () => {
      const callback = jest.fn();
      const comparer = jest.fn().mockReturnValue(true); // Always consider equal

      store.subscribe(callback, { 
        selector: state => state.count,
        comparer 
      });

      callback.mockClear();
      store.update({ count: 1 });

      expect(comparer).toHaveBeenCalledWith(0, 1);
      expect(callback).not.toHaveBeenCalled(); // Should not be called due to comparer
    });
  });

  describe('update', () => {
    it('should merge state by default', () => {
      store.update({ count: 5 });
      expect(store.state).toEqual({ count: 5, name: 'test' });
    });

    it('should merge state when mode is merge', () => {
      store.update({ count: 5 }, { mode: 'merge' });
      expect(store.state).toEqual({ count: 5, name: 'test' });
    });

    it('should replace state when mode is full', () => {
      store.update({ count: 5 } as any, { mode: 'full' });
      expect(store.state).toEqual({ count: 5 });
    });

    it('should work with function updater', () => {
      store.update(state => ({ ...state, count: state.count + 1 }));
      expect(store.state).toEqual({ count: 1, name: 'test' });
    });

    it('should throw error for unknown mode', () => {
      expect(() => {
        store.update({ count: 1 }, { mode: 'unknown' as any });
      }).toThrow('Unknown update mode: unknown');
    });
  });

  describe('error handling', () => {
    it('should handle selector errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const callback = jest.fn();
      
      store.subscribe(callback, {
        selector: () => {
          throw new Error('Selector error');
        }
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in selector:',
        expect.any(Error),
        expect.anything()
      );

      consoleSpy.mockRestore();
    });

    it('should handle comparer errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const callback = jest.fn();
      
      store.subscribe(callback, {
        comparer: () => {
          throw new Error('Comparer error');
        }
      });

      callback.mockClear();
      store.update({ count: 1 });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in comparer:',
        expect.any(Error),
        expect.anything(),
        expect.anything()
      );

      expect(callback).toHaveBeenCalled(); // Should still call callback

      consoleSpy.mockRestore();
    });
  });
});
