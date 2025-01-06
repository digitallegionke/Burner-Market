import React, { useEffect, useState } from 'react';
import { getProductTypes } from '../lib/shopify';

interface FilterTabProps {
  type: string;
  label: string;
  isActive: boolean;
  onClick: (type: string) => void;
}

function FilterTab({ type, label, isActive, onClick }: FilterTabProps) {
  return (
    <button
      onClick={() => onClick(type)}
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

interface FilterTabsProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

export function FilterTabs({ activeType, onTypeChange }: FilterTabsProps) {
  const [productTypes, setProductTypes] = useState<Array<{ type: string; label: string }>>([
    { type: 'all', label: 'All' }
  ]);

  useEffect(() => {
    async function fetchProductTypes() {
      try {
        const types = await getProductTypes();
        const formattedTypes = types.map(type => ({
          type,
          label: type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)
        }));
        setProductTypes(formattedTypes);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    }

    fetchProductTypes();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {productTypes.map(({ type, label }) => (
        <FilterTab
          key={type}
          type={type}
          label={label}
          isActive={activeType === type}
          onClick={onTypeChange}
        />
      ))}
    </div>
  );
} 