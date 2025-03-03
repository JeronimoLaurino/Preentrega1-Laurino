import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import CartRepository from '../repository/CartRepository.js';
import ProductRepository from '../repository/ProductRepository.js';
import TicketRepository from '../repository/TicketRepository.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/:cid/purchase', authMiddleware, async (req, res) => {
  const { cid } = req.params;
  const userEmail = req.user.email;

  try {
    const cart = await CartRepository.getById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const failedProducts = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await ProductRepository.getById(item.productId);
      if (!product || product.stock < item.quantity) {
        failedProducts.push(item.productId);
      } else {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await ProductRepository.update(product._id, product);
      }
    }

    if (failedProducts.length === cart.items.length) {
      return res.status(400).json({ message: 'Ningún producto pudo ser procesado' });
    }

    const ticket = {
      code: `TICKET-${uuidv4()}`,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: userEmail
    };

    const createdTicket = await TicketRepository.create(ticket);

    cart.items = cart.items.filter(item => !failedProducts.includes(item.productId));
    await CartRepository.update(cid, cart);

    res.status(200).json({
      message: 'Compra realizada con éxito',
      ticket: createdTicket,
      failedProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
});

export default router;
