import { getProducts } from '@/lib/shopify';
import ProductFilter from '@/components/ProductFilter';
import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';

export default async function BuildYourBox({ searchParams }) {
  try {
    const products = await getProducts();
    
    const filteredProducts = searchParams.type && searchParams.type !== 'all'
      ? products.filter(product => 
          product.productType.toLowerCase() === searchParams.type.replace('-', ' ')
        )
      : products;

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductFilter />
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid products={filteredProducts} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in BuildYourBox:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductFilter />
        <div className="text-center text-red-600">
          Error loading products. Please try again later.
        </div>
      </div>
    );
  }
} 