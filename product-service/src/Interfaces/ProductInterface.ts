export interface ProductInterface {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'Laptop' | 'Phone' | 'Game Console' | 'TV' | 'Desktop';
  promotion: string;
  quantityAvailable: number;
}
