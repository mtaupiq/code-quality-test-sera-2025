// Model exports - centralized access to all models
export { default as User } from './user.model';
export { default as Product } from './product.model';
export { default as Order } from './order.model';

// Re-export all models with namespace for easier imports
export * as UserModel from './user.model';
export * as ProductModel from './product.model';
export * as OrderModel from './order.model';