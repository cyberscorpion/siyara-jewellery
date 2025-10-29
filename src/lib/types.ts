export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  images: string[];
  description: string;
  material: string;
  isNew?: boolean;
  tags: string[];
}

export type Category = 'Necklaces' | 'Earrings' | 'Bracelets' | 'Rings' | 'Sets' | 'All';

export const CATEGORIES: Category[] = ['All', 'Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Sets'];
