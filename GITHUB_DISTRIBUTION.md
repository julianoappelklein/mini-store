# GitHub Distribution Guide

Mini Store is designed to be easily distributed via GitHub, making it accessible without requiring NPM or complex build processes.

## Distribution Methods

### 1. GitHub Releases + NPM
- **Recommended for production**: Publish to NPM for version management
- **GitHub Releases**: Automatic releases via GitHub Actions
- **CDN Access**: Available via unpkg.com and jsDelivr

### 2. Direct GitHub Distribution
- **jsDelivr CDN**: Access files directly from GitHub
- **No NPM required**: Perfect for simple projects
- **Version pinning**: Use specific tags/commits

## File Structure for Distribution

```
dist/
├── mini-store.esm.js          # ES modules
├── mini-store.js              # CommonJS
├── mini-store.umd.js          # UMD (namespaced)
├── mini-store.umd.min.js      # UMD minified
├── mini-store.browser.js      # Direct window injection
├── mini-store.browser.min.js  # Direct window injection (minified)
└── mini-store.d.ts            # TypeScript definitions
```

## Usage Examples

### Direct from GitHub via jsDelivr

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/mini-store@latest/dist/mini-store.browser.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/mini-store@v1.0.0/dist/mini-store.browser.min.js"></script>

<!-- Specific commit -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/mini-store@abc1234/dist/mini-store.browser.min.js"></script>
```

### ES Modules from GitHub

```html
<script type="module">
  import { MiniStore } from 'https://cdn.jsdelivr.net/gh/yourusername/mini-store@latest/dist/mini-store.esm.js';
  
  const store = new MiniStore({ count: 0 });
</script>
```

### Via NPM CDNs

```html
<!-- unpkg -->
<script src="https://unpkg.com/mini-store@latest/dist/mini-store.browser.min.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/mini-store@latest/dist/mini-store.browser.min.js"></script>
```

## Setup Instructions

### 1. Create GitHub Repository

1. Create a new repository on GitHub
2. Push your Mini Store code
3. Ensure `dist/` folder is committed (not in `.gitignore`)

### 2. Enable GitHub Actions

The provided workflows in `.github/workflows/` will:
- Run tests on every push/PR
- Create releases automatically when you push tags
- Publish to NPM (if configured)

### 3. Create a Release

```bash
# Tag a version
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will automatically:
# - Build the project
# - Run tests
# - Create a GitHub release
# - Publish to NPM (if configured)
```

### 4. Configure NPM Publishing (Optional)

To enable automatic NPM publishing:

1. Create an NPM account and generate an access token
2. Add the token as `NPM_TOKEN` in your GitHub repository secrets
3. Update the repository URL in `package.json`

## Benefits of GitHub Distribution

✅ **No Build Step**: Users can include your library directly  
✅ **Version Control**: Pin to specific versions or commits  
✅ **Free Hosting**: GitHub provides free CDN via jsDelivr  
✅ **Global Availability**: Fast CDN with worldwide distribution  
✅ **No Dependencies**: Users don't need NPM or build tools  
✅ **Direct Access**: Perfect for HTML prototypes and demos  

## File Size Reference

| File | Size (approx) | Use Case |
|------|---------------|-----------|
| `mini-store.browser.min.js` | ~3KB | Direct browser usage |
| `mini-store.umd.min.js` | ~3KB | Browser with namespace |
| `mini-store.esm.js` | ~4KB | Modern ES modules |
| `mini-store.js` | ~4KB | Node.js/CommonJS |

## Examples

See the `/examples` folder for complete working examples:
- `simple-counter.html` - Basic usage
- `todo-app.html` - Complex state management
- `node-example.js` - Node.js usage

All examples work directly by opening the HTML files in a browser!
