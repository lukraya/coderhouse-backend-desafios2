const ProductService = require('../services/product')

exports.productController = async (producto)=>{
    const product = new ProductService()
    await product.createProduct(producto)
}