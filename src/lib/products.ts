import { Product } from './types';
import productsData from '@/data/products.json';

export const PRODUCTS: Product[] = productsData.products as Product[];

export const WHATSAPP_NUMBER = productsData.whatsappNumber;

export function generateWhatsAppLink(product: Product): string {
  const message = `Hi! I'm interested in ordering:\n\nProduct ID: ${product.id}\nProduct Name: ${product.name}\nPrice: ₹${product.price}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
