class ProductService {
    constructor(models) {
        this.model = models.productModel
    }

    async createProduct(product){
        try {
            await this.model.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async getProduct(id){
        try {
            return this.model.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProducts(){
        try {
            let prods = await this.model.find().lean()
            return prods
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data){
        try {
            const productUpdated = await this.model.findByIdAndUpdate(id, data, {
                new: true,
            })
            return productUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            await this.model.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductService