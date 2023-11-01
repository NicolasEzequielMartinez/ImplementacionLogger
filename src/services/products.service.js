import ProductsDAO from "../daos/mongodb/ProductsMongo.dao.js";

export default class ProductService {
    constructor() {
        this.productDao = new ProductsDAO();
    };

    // Métodos ProductService:
    async createProductService(info) {
        let response = {};
        try {
            const resultDAO = await this.productDao.createProduct(info);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 500;
                response.message = "Error al crear el producto - Service: resultDao.result es null.";
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Producto creado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al crear el producto - Service: " + error.message;
        };
        return response;
    };

    async getProductByIdService(pid) {
        let response = {};
        try {
            const resultDAO = await this.productDao.getProductById(pid);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 404;
                response.message = `No se encontro ningún producto con el ID ${pid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Producto obtenido exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener el producto por ID - Service: " + error.message;
        };
        return response;
    };

    async getAllProductsService(limit, page, sort, filtro, filtroVal) {
        let response = {};
        try {
            const resultDAO = await this.productDao.getAllProducts(limit, page, sort, filtro, filtroVal);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result.products === null) {
                response.statusCode = 500;
                response.message = "Error al obtener los productos - Service: resultDao.result.products es null.";
            } else if (resultDAO.result.products.docs.length === 0) {
                response.statusCode = 404;
                response.message = `No se encontraron productos. El resultado fue de ${resultDAO.result.products.docs.length} productos.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Productos obtenidos exitosamente.";
                response.result = resultDAO.result.products;
                response.hasNextPage = resultDAO.result.hasNextPage;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener los productos - Service: " + error.message;
        };
        return response;
    };

    async deleteProductService(pid) {
        let response = {};
        try {
            const resultDAO = await this.productDao.deleteProduct(pid);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 500;
                response.message = "Error al eliminar el producto - Service: resultDao.result es null.";
            } else if (resultDAO.result.deletedCount === 0) {
                response.statusCode = 404;
                response.message = `No se encontró ningún producto con el ID ${pid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Producto eliminado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al eliminar el producto - Service: " + error.message;
        };
        return response;
    };

    async updateProductService(pid, updateProduct) {
        let response = {};
        try {
            const resultDAO = await this.productDao.updateProduct(pid, updateProduct);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.result === null) {
                response.statusCode = 500;
                response.message = "Error al actualizar el producto - Service: resultDao.result es null.";
            } else if (resultDAO.result.matchedCount === 0) {
                response.statusCode = 404;
                response.message = `No se encontró ningún producto con el ID ${pid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Producto actualizado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al actualizar el producto - Service: " + error.message;
        };
        return response;
    };
    
};