import React, { useState } from 'react';
import { addToCart } from '../lib/shopify';

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
  disabled?: boolean;
  isPreOrder?: boolean;
  shippingDate?: string | null;
}

export function AddToCartButton({ 
  variantId, 
  className, 
  disabled,
  isPreOrder = false,
  shippingDate
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!variantId || disabled || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      await addToCart(variantId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isPreOrder ? 'Pre-Order Now' : 'Add To Cart';
  const buttonStyle = isPreOrder 
    ? 'bg-[#c06654] hover:bg-[#c06654]/90' 
    : 'bg-[#3A4443] hover:bg-opacity-90';

  return (
    <div className="relative">
      <button 
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`
          ${className || ''} 
          py-3 px-6 
          text-white 
          rounded-full text-lg font-medium 
          transition-all
          ${buttonStyle}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isLoading ? 'cursor-wait' : ''}
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            {isPreOrder ? 'Processing...' : 'Adding...'}
          </div>
        ) : (
          <>
            {buttonText}
            {isPreOrder && shippingDate && (
              <div className="text-xs mt-1 font-normal">
                Expected to ship: {shippingDate}
              </div>
            )}
          </>
        )}
      </button>
      
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
