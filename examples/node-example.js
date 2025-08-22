// Example usage in Node.js or with a bundler
import { MiniStore } from '../dist/mini-store.esm.js';

// Create a store for a shopping cart
const cartStore = new MiniStore({
  items: [],
  total: 0,
  discountCode: null,
  discountAmount: 0
});

// Helper functions
function calculateTotal(items, discountAmount = 0) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return Math.max(0, subtotal - discountAmount);
}

// Subscribe to items changes and update total
cartStore.subscribe(
  (items) => {
    const newTotal = calculateTotal(items, cartStore.state.discountAmount);
    if (newTotal !== cartStore.state.total) {
      cartStore.update({ total: newTotal });
    }
  },
  {
    selector: state => state.items,
    emitOnSubscribe: false // Don't update on initial subscription
  }
);

// Subscribe to discount changes and update total
cartStore.subscribe(
  (discountAmount) => {
    const newTotal = calculateTotal(cartStore.state.items, discountAmount);
    if (newTotal !== cartStore.state.total) {
      cartStore.update({ total: newTotal });
    }
  },
  {
    selector: state => state.discountAmount,
    emitOnSubscribe: false
  }
);

// Subscribe to total changes for logging
cartStore.subscribe(
  (total, prevTotal) => {
    console.log(`Cart total updated: $${prevTotal || 0} → $${total}`);
  },
  {
    selector: state => state.total,
    emitOnSubscribe: false
  }
);

// Cart operations
function addItem(product, quantity = 1) {
  cartStore.update(state => {
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity of existing item
      return {
        ...state,
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    } else {
      // Add new item
      return {
        ...state,
        items: [...state.items, { ...product, quantity }]
      };
    }
  });
}

function removeItem(productId) {
  cartStore.update(state => ({
    ...state,
    items: state.items.filter(item => item.id !== productId)
  }));
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  
  cartStore.update(state => ({
    ...state,
    items: state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  }));
}

function applyDiscount(code, amount) {
  cartStore.update({
    discountCode: code,
    discountAmount: amount
  });
}

function clearCart() {
  cartStore.update({
    items: [],
    total: 0,
    discountCode: null,
    discountAmount: 0
  });
}

// Example usage
console.log('Shopping Cart Example with Mini Store');
console.log('=====================================');

// Add some items
addItem({ id: 1, name: 'Laptop', price: 999.99 });
addItem({ id: 2, name: 'Mouse', price: 29.99 }, 2);
addItem({ id: 1, name: 'Laptop', price: 999.99 }); // This will increase quantity

console.log('Current cart:', cartStore.state);

// Apply a discount
applyDiscount('SAVE10', 50);

console.log('After discount:', cartStore.state);

// Update quantity
updateQuantity(2, 1); // Reduce mouse quantity to 1

console.log('After quantity update:', cartStore.state);

// Subscribe to specific item count
const unsubscribeItemCount = cartStore.subscribe(
  (itemCount) => {
    console.log(`Total items in cart: ${itemCount}`);
  },
  {
    selector: state => state.items.reduce((sum, item) => sum + item.quantity, 0)
  }
);

// Clear the cart
setTimeout(() => {
  console.log('\nClearing cart...');
  clearCart();
  unsubscribeItemCount();
}, 1000);
