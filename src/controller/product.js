const ProductService = require('../services/product')
const productService = new ProductService

class ProductController {
    async createProduct(producto){        
        await productService.createProduct(producto)
    }

    async getProduct(id){
        return productService.getProduct(id)
    }

    async getAllProducts(){
        try {
            let prods = await productService.getAllProducts()
            return prods
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data){
        await productService.updateProduct(id, data)
    }

    async deleteProduct(id){
        await productService.deleteProduct(id)
    }    
}

module.exports = new ProductController