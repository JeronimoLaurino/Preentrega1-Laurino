import express from 'express';
import ProductRepository from '../repository/ProductRepository.js';
import { adminMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', adminMiddleware, async (req, res) => {
  try {
    const productData = req.body;

    console.log('Datos recibidos:', productData);

    if (!productData.name || !productData.price || !productData.stock) {
      return res.status(400).json({ message: 'Faltan datos para crear el producto.' });
    }

    const product = await ProductRepository.create(productData);
    res.status(201).json({ message: 'Producto creado con éxito', product });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
});

router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'Stock no válido.' });
    }

    await ProductRepository.updateStock(id, stock);
    const product = await ProductRepository.getById(id);

    res.json({ message: 'Stock actualizado con éxito', product });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: 'Error al actualizar el producto.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await ProductRepository.getAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: 'Error al obtener los productos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: 'Error al obtener el producto.' });
  }
});

export default router;
