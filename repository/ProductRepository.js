import ProductDAO from '../dao/ProductDAO.js';

class ProductRepository {
    async create(productData) {
        try {
            const product = await ProductDAO.create(productData);
            return product;
        } catch (error) {
            console.error("Error en el repositorio al crear el producto:", error);
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async updateStock(id, stock) {
        try {
            const product = await ProductDAO.updateStock(id, stock);
            return product;
        } catch (error) {
            console.error("Error en el repositorio al actualizar el stock:", error);
            throw new Error(`Error al actualizar el stock: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const products = await ProductDAO.getAll();
            return products;
        } catch (error) {
            console.error("Error en el repositorio al obtener los productos:", error);
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const product = await ProductDAO.getById(id);
            return product;
        } catch (error) {
            console.error("Error en el repositorio al obtener el producto:", error);
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }
}

export default new ProductRepository();