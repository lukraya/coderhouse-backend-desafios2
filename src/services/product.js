const productModel = require('../dao/models/product')

module.exports = class {
    async createProduct(product){
        await productModel.create(product)
    }

    async getProduct(id){
        return productModel.findById(id)
    }

    async getAllProducts(){
        try {
            let prods = await productModel.find().lean()
            return prods
        } catch (error) {
            console.log(error)
        }
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