const ProductService = require('../services/product')
const product = new ProductService

class ProductController {
    async createProduct(producto){        
        await product.createProduct(producto)
    }

    async getProduct(id){
        return product.getProduct(id)
    }

    async getAllProducts(){
        try {
            let prods = await product.getAllProducts()
            return prods
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data){
        await product.updateProduct(id, data)
    }

    async deleteProduct(id){
        await product.deleteProduct(id)
    }    
}

module.exports = new ProductController