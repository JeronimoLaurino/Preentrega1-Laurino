import Cart from '../models/Cart.js';

class CartRepository {
  static async getById(cartId) {
    return Cart.findById(cartId).populate('items.productId');
  }

  static async update(cartId, cartData) {
    return Cart.findByIdAndUpdate(cartId, cartData, { new: true });
  }
}

export default CartRepository;