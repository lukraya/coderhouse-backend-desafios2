class ProductService {
    constructor(dao) {
        this.dao = dao
    }

    async createProduct(product){
        try {
            await this.dao.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async getProduct(id){
        try {
            return this.dao.getById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProducts(){
        try {
            let prods = await this.dao.getAll()
            return prods
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, data){
        try {
            const productUpdated = await this.dao.update(id, data, {
                new: true,
            })
            return productUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            await this.dao.delete(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductService