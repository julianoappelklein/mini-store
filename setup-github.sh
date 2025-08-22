#!/bin/bash

# Mini Store - GitHub Setup Script
# This script helps set up the repository for GitHub distribution

echo "🚀 Mini Store GitHub Setup"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the Mini Store root directory?"
    exit 1
fi

echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed!"
    exit 1
fi

echo "📁 Checking distribution files..."
files=(
    "dist/mini-store.esm.js"
    "dist/mini-store.js" 
    "dist/mini-store.umd.js"
    "dist/mini-store.umd.min.js"
    "dist/mini-store.browser.js"
    "dist/mini-store.browser.min.js"
    "dist/index.d.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file" | tr -d ' ')
        echo "  ✅ $file ($size bytes)"
    else
        echo "  ❌ $file (missing)"
    fi
done

echo ""
echo "🔧 Next steps for GitHub distribution:"
echo "1. Create a GitHub repository"
echo "2. Update package.json with your repository URL"
echo "3. Replace 'yourusername' in examples with your GitHub username"
echo "4. Commit all files (including dist/)"
echo "5. Push to GitHub"
echo "6. Create releases using git tags (e.g., 'git tag v1.0.0')"
echo ""
echo "📚 Your library will then be available via:"
echo "   https://cdn.jsdelivr.net/gh/yourusername/mini-store@latest/dist/mini-store.browser.min.js"
echo ""
echo "✨ Setup complete! Your Mini Store is ready for GitHub distribution!"
