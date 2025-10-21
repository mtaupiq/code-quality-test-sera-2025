export type UserType = any;
export type ProductType = any;
export type OrderType = any;

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  status: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  status: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  total: number;
  status: string;
}

export type RequestStatus = "pending" | "approved" | "rejected";
export type PaymentStatus = "pending" | "completed" | "failed";

export interface UnusedInterface {
  someField: string;
  anotherField: number;
}
