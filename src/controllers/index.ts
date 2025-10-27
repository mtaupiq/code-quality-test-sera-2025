// User Controller exports
export {
  processCreate as createUser,
  upd as updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from './user.controller';

// Order Controller exports
export {
  make as createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from './order.controller';

// Product Controller exports
export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './product.controller';

// Re-export all controllers with namespace for easier imports
export * as UserController from './user.controller';
export * as OrderController from './order.controller';
export * as ProductController from './product.controller';
