const ProductDAO = require('../models/dao/product')

const productDao = new ProductDAO()

module.exports = class ProductService {    
    async createProduct(product){
        return productDao.createProduct(product)        
    }

    async listProducts(){
        try {
            let prods = productDao.listProducts()
            return prods
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        await productDao.deleteProduct(id)
    }

    async updateProduct(changes, id){
        await productDao.updateProduct(changes, id)
    }
}