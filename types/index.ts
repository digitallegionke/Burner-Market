export type ProductType = 'all' | 'vegetables' | 'fruits' | 'herbs';

export interface FilterTabProps {
  type: ProductType;
  isActive: boolean;
  onClick: (type: ProductType) => void;
  children: React.ReactNode;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  price: string;
  image: {
    src: string;
    alt?: string;
  };
} 