# Publishing Guide for Mini Store

## Before Publishing

1. **Update version in package.json** if needed
2. **Run tests**: `npm test`
3. **Build the project**: `npm run build`
4. **Test locally**: Check examples work correctly

## Publishing to NPM

1. **Login to NPM** (first time only):
   ```bash
   npm login
   ```

2. **Publish**:
   ```bash
   npm publish
   ```

## Distribution Files

After building, the following files are available in `/dist/`:

- `mini-store.esm.js` - ES modules build for modern bundlers
- `mini-store.js` - CommonJS build for Node.js
- `mini-store.umd.js` - UMD build for browsers (development)
- `mini-store.umd.min.js` - Minified UMD build for browsers (production)
- `mini-store.d.ts` - TypeScript definitions
- `*.map` files - Source maps for debugging

## Usage Examples

### In HTML (CDN)
```html
<script src="https://unpkg.com/mini-store/dist/mini-store.umd.min.js"></script>
<script>
  const { SimpleStore } = MiniStore;
  // Use the store...
</script>
```

### In JavaScript/TypeScript projects
```javascript
import { SimpleStore } from 'mini-store';
// or
const { SimpleStore } = require('mini-store');
```

### Testing the Package Locally

Before publishing, you can test the package locally:

1. **Pack the package**:
   ```bash
   npm pack
   ```

2. **Install in another project**:
   ```bash
   npm install /path/to/mini-store-1.0.0.tgz
   ```

## Features Included

- ✅ TypeScript support with full type definitions
- ✅ Multiple build formats (ESM, CommonJS, UMD)
- ✅ Browser compatibility
- ✅ Node.js compatibility
- ✅ Comprehensive test coverage
- ✅ Documentation and examples
- ✅ Zero dependencies
- ✅ Minified builds for production

## Repository Structure

```
mini-store/
├── src/                    # Source code
│   ├── index.ts           # Main library file
│   └── __tests__/         # Test files
├── dist/                  # Built files (auto-generated)
├── examples/              # Usage examples
│   ├── simple-counter.html
│   ├── todo-app.html
│   └── node-example.js
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── rollup.config.js       # Build configuration
├── jest.config.js         # Test configuration
└── README.md              # Documentation
```
