const productModel = require('../dao/models/product')

const productService = (models)=>({
    async createProduct(product){
        try {
            await productModel.create(product)
        } catch (error) {
            console.log(error)
        }
    },

    async getProduct(id){
        try {
            return productModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    },

    async getAllProducts(){
        try {
            let prods = await productModel.find().lean()
            return prods
        } catch (error) {
            console.log(error)
        }
    },

    async updateProduct(id, data){
        try {
            const productUpdated = await productModel.findByIdAndUpdate(id, data, {
                new: true,
            })
            return productUpdated
        } catch (error) {
            console.log(error)
        }
    },

    async deleteProduct(id){
        try {
            await productModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    },
})

module.exports = productService