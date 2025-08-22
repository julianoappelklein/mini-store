# Mini Store

A lightweight reactive state management library that works in both Node.js and browsers.

## Features

- 🪶 **Lightweight**: Minimal footprint with no dependencies
- 🔄 **Reactive**: Subscribe to state changes with fine-grained updates
- 🎯 **Selective Updates**: Use selectors to subscribe to specific parts of state
- 🌐 **Universal**: Works in Node.js, browsers, and bundlers
- 📝 **TypeScript**: Full TypeScript support with type safety
- 🔧 **Flexible**: Support for custom comparers and update modes

## Installation

### NPM Package
```bash
npm install mini-store
```

### GitHub Distribution
See [GITHUB_DISTRIBUTION.md](GITHUB_DISTRIBUTION.md) for details on using Mini Store directly from GitHub without NPM.

### Direct Browser Usage
```html
<!-- Using GitHub as CDN with jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/julianoappelklein/mini-store@latest/dist/mini-store.browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/julianoappelklein/mini-store@latest/dist/mini-store.umd.min.js"></script>

<!-- ES modules from GitHub -->
<script type="module">
  import { MiniStore } from 'https://cdn.jsdelivr.net/gh/julianoappelklein/mini-store@latest/dist/mini-store.esm.js';
</script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/julianoappelklein/mini-store@v1.0.0/dist/mini-store.browser.min.js"></script>
<script>
  // MiniStore is directly available!
  const store = new MiniStore({ count: 0 });
</script>
```

## Usage

### Basic Usage

```javascript
import { MiniStore } from 'mini-store';

// Create a store with initial state
const store = new MiniStore({
  count: 0,
  user: { name: 'John', age: 30 }
});

// Subscribe to all state changes
const unsubscribe = store.subscribe((newState, prevState) => {
  console.log('State changed:', newState);
});

// Update the state
store.update({ count: 1 }); // Merges with existing state
store.update({ count: 2 }, { mode: 'merge' }); // Explicit merge
store.update({ count: 3, newProp: 'value' }, { mode: 'full' }); // Replace entire state

// Update with a function
store.update(state => ({ ...state, count: state.count + 1 }));

// Unsubscribe
unsubscribe();
```

### Browser Builds Comparison

The library provides different builds for browser usage:

| Build | File | Usage | Access Pattern |
|-------|------|-------|----------------|
| **UMD** | `mini-store.umd.js` | Namespaced | `const { MiniStore } = MiniStore;` |
| **Direct Injection** | `mini-store.browser.js` | Global | `const store = new MiniStore({});` |
| **ES Module** | `mini-store.esm.js` | Import | `import { MiniStore } from '...';` |

#### Direct Window Injection Example

```html
<script src="https://unpkg.com/mini-store/dist/mini-store.browser.min.js"></script>
<script>
  // MiniStore is directly available on window - no namespace needed!
  const store = new MiniStore({ count: 0 });
  
  store.subscribe(count => {
    document.getElementById('counter').textContent = count;
  }, { selector: state => state.count });
  
  // Update count
  store.update(state => ({ ...state, count: state.count + 1 }));
</script>
```

### Selective Subscriptions

```javascript
// Subscribe to a specific part of state
const unsubscribeCount = store.subscribe(
  (count, prevCount) => {
    console.log('Count changed from', prevCount, 'to', count);
  },
  {
    selector: state => state.count,
    comparer: (a, b) => a === b // Custom comparer (optional)
  }
);

// Subscribe to computed values
const unsubscribeFullName = store.subscribe(
  (fullName) => {
    console.log('Full name:', fullName);
  },
  {
    selector: state => `${state.user.name} (${state.user.age})`
  }
);
```

### HTML Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mini Store Example</title>
</head>
<body>
    <div id="counter">0</div>
    <button id="increment">+</button>
    <button id="decrement">-</button>

    <script src="https://unpkg.com/mini-store/dist/mini-store.umd.min.js"></script>
    <script>
        const { MiniStore } = MiniStore;
        
        const store = new MiniStore({ count: 0 });
        
        const counterEl = document.getElementById('counter');
        
        // Subscribe to count changes
        store.subscribe(
            (count) => {
                counterEl.textContent = count;
            },
            { selector: state => state.count }
        );
        
        // Button event handlers
        document.getElementById('increment').onclick = () => {
            store.update(state => ({ count: state.count + 1 }));
        };
        
        document.getElementById('decrement').onclick = () => {
            store.update(state => ({ count: state.count - 1 }));
        };
    </script>
</body>
</html>
```

## API Reference

### Constructor

```typescript
new MiniStore<T>(initialState: T)
```

### Methods

#### `subscribe(callback, options?)`

Subscribe to state changes.

**Parameters:**
- `callback: (newValue, prevValue) => void` - Function called when subscribed value changes
- `options?: SubscriberOptions` - Optional configuration

**Options:**
- `selector?: (state) => any` - Function to select specific part of state
- `comparer?: (a, b) => boolean` - Custom equality comparison
- `emitOnSubscribe?: boolean` - Whether to emit immediately on subscription

**Returns:** `() => void` - Unsubscribe function

#### `update(stateOrFunction, options?)`

Update the store state.

**Parameters:**
- `stateOrFunction: T | ((state: T) => T)` - New state or update function
- `options?: UpdateOptions` - Optional configuration

**Options:**
- `mode?: 'merge' | 'full'` - Update mode (default: 'merge')

### Properties

- `state: T` - Current state (read-only)
- `emitOnSubscribe: boolean` - Global setting for emitting on subscribe (default: true)

## TypeScript Support

The library is written in TypeScript and provides full type safety:

```typescript
interface AppState {
  count: number;
  user: {
    name: string;
    age: number;
  };
}

const store = new MiniStore<AppState>({
  count: 0,
  user: { name: 'John', age: 30 }
});

// Type-safe selectors
store.subscribe(
  (count: number) => console.log(count),
  { selector: (state: AppState) => state.count }
);
```

## License

MIT
