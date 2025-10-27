// Service exports - centralized access to all services
export { UserService } from './user.service';
export { ProductService } from './product.service';
export { OrderService } from './order.service';

// Re-export with namespace for easier imports
export * as UserServiceNS from './user.service';
export * as ProductServiceNS from './product.service';
export * as OrderServiceNS from './order.service';
