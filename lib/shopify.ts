import Client, { Checkout } from 'shopify-buy';

export type { Checkout };

const client = Client.buildClient({
  domain: '3zmiey-nc.myshopify.com',
  storefrontAccessToken: '037386cf4aa2036e501823d5815793d3',
  apiVersion: '2024-01'
});

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  productType: string;
  images: { src: string }[];
  variants: {
    id: string;
    price: { amount: string };
    available: boolean;
    inventoryQuantity: number;
  }[];
  availableForSale: boolean;
  tags: string[];
  vendor: string;
}

// Helper function to check if a product is available for pre-order
export function isPreOrderProduct(product: ShopifyProduct): boolean {
  return product.tags.some(tag => tag.toLowerCase().includes('pre-order'));
}

// Helper function to get estimated shipping date from tags
export function getPreOrderShippingDate(product: ShopifyProduct): string | null {
  const shippingTag = product.tags.find(tag => tag.toLowerCase().startsWith('ships:'));
  return shippingTag ? shippingTag.split(':')[1].trim() : null;
}

let checkout: Checkout | null = null;

// Get the current checkout ID from localStorage
function getStoredCheckoutId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('checkoutId');
}

// Store the checkout ID in localStorage
function storeCheckoutId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('checkoutId', id);
}

// Initialize checkout from storage or create new
async function initializeCheckout(): Promise<Checkout> {
  const storedCheckoutId = getStoredCheckoutId();

  if (storedCheckoutId) {
    try {
      // Try to fetch existing checkout
      const existingCheckout = await client.checkout.fetch(storedCheckoutId);
      
      // Check if the checkout is still valid (not completed)
      if (existingCheckout && !existingCheckout.completedAt) {
        checkout = existingCheckout;
        return existingCheckout;
      }
    } catch (error) {
      console.error('Error fetching stored checkout:', error);
    }
  }

  // Create new checkout if none exists or stored one is invalid
  const newCheckout = await createCart();
  storeCheckoutId(newCheckout.id);
  return newCheckout;
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const products = await client.product.fetchAll();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductsByType(productType: string): Promise<ShopifyProduct[]> {
  try {
    const query = productType === 'all'
      ? undefined
      : { query: `product_type:${productType}` };
    
    const products = await client.product.fetchQuery(query);
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products by type:', error);
    return [];
  }
}

export async function getProductTypes(): Promise<string[]> {
  try {
    const products = await client.product.fetchAll();
    const types = new Set(products.map(product => product.productType));
    return ['all', ...Array.from(types)];
  } catch (error) {
    console.error('Error fetching product types:', error);
    return ['all'];
  }
}

export async function createCart(): Promise<Checkout> {
  try {
    const newCheckout = await client.checkout.create();
    checkout = newCheckout;
    return newCheckout;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function addToCart(variantId: string, quantity: number = 1): Promise<void> {
  try {
    if (!variantId) {
      throw new Error('Variant ID is required');
    }

    // Initialize or fetch existing checkout
    if (!checkout) {
      checkout = await initializeCheckout();
    }

    // Add the item to the cart
    const lineItemsToAdd = [{
      variantId,
      quantity,
    }];

    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    checkout = updatedCheckout;

    // Redirect to checkout
    if (updatedCheckout.webUrl) {
      window.location.href = updatedCheckout.webUrl;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

// Get current cart items
export async function getCartItems(): Promise<Checkout | null> {
  try {
    if (!checkout) {
      checkout = await initializeCheckout();
    }
    return checkout;
  } catch (error) {
    console.error('Error getting cart items:', error);
    return null;
  }
}

// Update item quantity in cart
export async function updateCartItemQuantity(lineItemId: string, quantity: number): Promise<void> {
  try {
    if (!checkout) {
      throw new Error('No active checkout found');
    }

    const updatedCheckout = await client.checkout.updateLineItems(checkout.id, [
      { id: lineItemId, quantity }
    ]);
    checkout = updatedCheckout;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(lineItemId: string): Promise<void> {
  try {
    if (!checkout) {
      throw new Error('No active checkout found');
    }

    const updatedCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
    checkout = updatedCheckout;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

// Proceed to checkout
export async function proceedToCheckout(): Promise<string> {
  try {
    if (!checkout) {
      throw new Error('No active checkout found');
    }

    // Ensure checkout is up to date
    const currentCheckout = await client.checkout.fetch(checkout.id);
    
    if (!currentCheckout.webUrl) {
      throw new Error('Checkout URL not found');
    }

    return currentCheckout.webUrl;
  } catch (error) {
    console.error('Error proceeding to checkout:', error);
    throw error;
  }
}

// Clear cart after successful checkout
export function clearCart(): void {
  checkout = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('checkoutId');
  }
}
