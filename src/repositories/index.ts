// Repository exports - centralized access to all repositories
export { UserRepository } from './user.repository';
export { ProductRepository } from './product.repository';
export { OrderRepository } from './order.repository';

// Re-export with namespace for easier imports
export * as UserRepositoryNS from './user.repository';
export * as ProductRepositoryNS from './product.repository';
export * as OrderRepositoryNS from './order.repository';
