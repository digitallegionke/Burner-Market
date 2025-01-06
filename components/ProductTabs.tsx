import React, { useState, useEffect } from 'react';
import { getProducts } from '../lib/shopify';
import Image from 'next/image';

import { Product as ShopifyProduct } from 'shopify-buy';

interface Product extends Omit<ShopifyProduct, 'variants'> {
  variants: {
    id: string;
    price: { amount: number };
  }[];
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 md:px-6 py-2 rounded-full text-sm whitespace-nowrap font-medium transition-all ${
      isActive 
        ? 'bg-[#3A4443] text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'pantry', label: 'Pantry' },
  { id: 'dairy', label: 'Dairy and Eggs' },
  { id: 'beverages', label: 'Healthy Beverages' }
];

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      filterProducts(allProducts, activeTab);
      setIsLoading(false);
    };

    fetchProducts();
  }, [activeTab]);

  const filterProducts = (products: Product[], category: string) => {
    if (category === 'all') {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => {
      const productType = product.productType.toLowerCase();
      switch (category) {
        case 'veg':
          return productType.includes('vegetable');
        case 'fruits':
          return productType.includes('fruit');
        case 'pantry':
          return productType.includes('pantry');
        case 'dairy':
          return productType.includes('dairy') || productType.includes('eggs');
        case 'beverages':
          return productType.includes('beverage');
        default:
          return true;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleTabClick = (category: string) => {
    setActiveTab(category);
    filterProducts(products, category);
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Tabs Container */}
      <div className="sticky top-0 z-10 bg-white py-4 -mx-4 md:mx-0">
        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-4 md:px-0">
          {CATEGORIES.map(category => (
            <Tab
              key={category.id}
              label={category.label}
              isActive={activeTab === category.id}
              onClick={() => handleTabClick(category.id)}
            />
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          // Loading skeleton
          [...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : (
          // Product cards
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group space-y-3 transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {product.images[0] && (
                  <Image 
                    src={product.images[0].src} 
                    alt={product.title || ''} 
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                )}
              </div>
              <div className="space-y-1 px-1">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  KES {product.variants[0]?.price.amount.toString() || '0'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty state */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category</p>
        </div>
      )}
    </div>
  );
}
