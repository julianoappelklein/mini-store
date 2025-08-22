# Contributing to Mini Store

Thank you for your interest in contributing to Mini Store! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mini-store.git
   cd mini-store
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

## Development Workflow

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the `src/` directory

3. **Add tests** for new functionality in `src/__tests__/`

4. **Run tests** to ensure everything works:
   ```bash
   npm test
   ```

5. **Build the project** to ensure it compiles:
   ```bash
   npm run build
   ```

6. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add: new feature description"
   ```

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub

## Code Guidelines

- Write TypeScript code with proper type annotations
- Add JSDoc comments for public APIs
- Write tests for new functionality
- Follow the existing code style
- Keep commits focused and atomic

## Testing

- All tests must pass: `npm test`
- Add tests for new features
- Test both Node.js and browser environments when applicable

## Building

The build system generates multiple formats:
- ES modules (`dist/mini-store.esm.js`)
- CommonJS (`dist/mini-store.js`) 
- UMD for browsers (`dist/mini-store.umd.js`)
- TypeScript definitions (`dist/mini-store.d.ts`)

## Reporting Issues

When reporting issues, please include:
- Mini Store version
- Environment (Node.js version, browser version)
- Minimal reproduction code
- Expected vs actual behavior

Thank you for contributing!
