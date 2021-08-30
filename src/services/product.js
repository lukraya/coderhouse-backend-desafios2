const productModel = require('../dao/models/product')

module.exports = class {
    async createProduct(product){
        await productModel.create(product)
    }

    async getProduct(id){
        return productModel.findById(id)
    }

    async getAllProducts(){
        let prods = await productModel.find()
        return prods
    }

    async updateProduct(id, data){
        const productUpdated = await productModel.findByIdAndUpdate(id, data, {
            new: true,
        })
        return productUpdated
    }

    async deleteProduct(id){
        await productModel.findByIdAndDelete(id)
    }
}