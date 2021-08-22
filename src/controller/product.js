const ProductService = require('../services/product')

const productService = new ProductService()

class ProductController {
    async createProduct(producto){        
        await productService.createProduct(producto)
    }

    async listProducts(){
        try {
            let prods = await productService.listProducts()
            return prods
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ProductController