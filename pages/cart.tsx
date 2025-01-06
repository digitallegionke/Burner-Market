import React from 'react';
import { Cart } from '../components/Cart';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#354439] mb-8">Shopping Cart</h1>
      <Cart />
    </div>
  );
} 