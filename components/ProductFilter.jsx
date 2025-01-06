'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PRODUCT_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'pantry', label: 'Pantry' },
  { id: 'dairy-and-eggs', label: 'Dairy and Eggs' },
  { id: 'healthy-beverages', label: 'Healthy Beverages' }
];

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const type = searchParams.get('type') || 'all';
    setActiveFilter(type);
  }, [searchParams]);

  const handleFilterClick = (type) => {
    const params = new URLSearchParams(searchParams);
    if (type === 'all') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    router.push(`/build-your-box?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {PRODUCT_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => handleFilterClick(type.id)}
          className={`px-6 py-2 rounded-full text-base font-medium transition-colors
            ${activeFilter === type.id 
              ? 'bg-[#354439] text-white' 
              : 'bg-[#F6F6F4] text-[#354439] hover:bg-[#354439]/10'
            }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
} 