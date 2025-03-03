import Product from '../models/Product.js';

class ProductDAO {
    async create(productData) {
        try {
            const product = new Product(productData);
            await product.save();
            return product;
        } catch (error) {
            console.error("Error en el método create de ProductDAO:", error);
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async updateStock(id, stock) {
        try {
            const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
            return product;
        } catch (error) {
            console.error("Error en el método updateStock de ProductDAO:", error);
            throw new Error(`Error al actualizar el stock: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            console.error("Error en el método getAll de ProductDAO:", error);
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            console.error("Error en el método getById de ProductDAO:", error);
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }
}

export default new ProductDAO();
