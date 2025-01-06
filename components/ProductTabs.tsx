import React, { useState, useEffect } from 'react';
import { ShopifyProduct } from '../lib/shopify';

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-full text-base font-medium transition-colors
        ${isActive 
          ? 'bg-[#354439] text-white'
          : 'bg-[#f6f6f4] text-[#354439] hover:bg-[#354439]/10'
        }
      `}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

interface ProductTabsProps {
  products: ShopifyProduct[];
  onFilter: (products: ShopifyProduct[]) => void;
}

export function ProductTabs({ products, onFilter }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'veg', label: 'Veg' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'pantry', label: 'Pantry' },
    { id: 'dairy', label: 'Dairy and Eggs' },
    { id: 'beverages', label: 'Healthy Beverages' },
  ];

  const filterProducts = (products: ShopifyProduct[], type: string) => {
    if (type === 'all') return products;
    return products.filter(product => 
      product.productType.toLowerCase() === type.toLowerCase()
    );
  };

  useEffect(() => {
    const filtered = filterProducts(products, activeTab);
    onFilter(filtered);
  }, [activeTab, products, onFilter]);

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  );
}
