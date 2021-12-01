const productDao = (model)=>({
    async getAll() {
        const products = model.find().lean()
        return products
    },

    async getById(id) {
        const product = model.findById(id)
        return product
    },

    async create(product) {
        const newProduct = model.create(product)
        return newProduct
    },

    async update(id, data, options) {
        const updatedProduct = model.findByIdAndUpdate(id, data, options)
        return updatedProduct
    },

    async delete(id) {
        const deletedProduct = model.findOneAndDelete(id)
        return deletedProduct
    },
})

module.exports = productDao