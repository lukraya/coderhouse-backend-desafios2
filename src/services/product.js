const ProductDAO = require('../models/dao/product')

module.exports = class ProductService {
    async createProduct(product){
        const productDao = new ProductDAO()
        return productDao.createProduct(product)        
    }
}