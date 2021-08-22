const db = require('../db/db')

module.exports = class ProductDAO {
    async createProduct({title, price, thumbnail}){
        try {
            await db('product').insert({
                title,
                price,
                thumbnail,
            })
        }
        catch (error){
            console.log(error)
        }
    }

    async listProducts(){
        try {
            let prods = await db('product').select('title', 'price', 'thumbnail')
            return prods
        }
        catch (error) {
            console.log(error)
        }
    }
}