export type ProductType = any;

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}