import React from 'react';
import { addToCart } from '../lib/shopify';

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
}

export function AddToCartButton({ variantId, className }: AddToCartButtonProps) {
  const handleClick = async () => {
    await addToCart(variantId);
  };

  return (
    <button 
      onClick={handleClick}
      className={`${className || ''} py-3 px-6 bg-[#3A4443] text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all`}
    >
      Add To Cart
    </button>
  );
}
