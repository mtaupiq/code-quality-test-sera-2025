export type OrderType = any;

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