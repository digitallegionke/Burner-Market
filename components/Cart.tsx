import React, { useState, useEffect } from 'react';
import { getCartItems, updateCartItemQuantity, removeFromCart, proceedToCheckout, Checkout } from '../lib/shopify';
import type { CheckoutLineItem } from 'shopify-buy';
import Image from 'next/image';

export function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<Checkout | null>(null);

  // Fetch cart items on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cart = await getCartItems();
      setCheckout(cart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Error loading cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (lineItemId: string, quantity: number) => {
    try {
      setError(null);
      await updateCartItemQuantity(lineItemId, quantity);
      await loadCart(); // Reload cart to get updated state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    try {
      setError(null);
      await removeFromCart(lineItemId);
      await loadCart(); // Reload cart to get updated state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const handleCheckout = async () => {
    try {
      setError(null);
      const checkoutUrl = await proceedToCheckout();
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to proceed to checkout');
      console.error('Error proceeding to checkout:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-[#354439] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!checkout || !checkout.lineItems || checkout.lineItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  const subtotal = checkout.subtotalPrice 
    ? new Intl.NumberFormat('en-KE', { 
        style: 'currency', 
        currency: 'KES' 
      }).format(parseFloat(checkout.subtotalPrice.amount))
    : 'KSH 0.00';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#354439] mb-6">Your Cart</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {checkout.lineItems.map((item: CheckoutLineItem) => (
          <div key={item.id} className="py-4 flex items-center gap-4">
            {item.variant?.image && (
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={item.variant.image.src}
                  alt={item.title}
                  className="object-cover rounded-md"
                  fill
                  sizes="80px"
                />
              </div>
            )}
            
            <div className="flex-grow">
              <h3 className="font-medium text-[#354439]">{item.title}</h3>
              {item.variant?.title !== 'Default Title' && (
                <p className="text-sm text-gray-500">{item.variant?.title}</p>
              )}
              <p className="text-[#c06654] font-medium">
                {new Intl.NumberFormat('en-KE', { 
                  style: 'currency', 
                  currency: 'KES' 
                }).format(item.variant?.price ? parseFloat(item.variant.price.amount) : 0)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="rounded-md border border-gray-300 p-1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-lg font-medium mb-6">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-[#354439] text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
} 