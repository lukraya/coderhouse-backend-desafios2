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
            let prods = await db('product').select()
            return prods
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            await db('product').where({id: id}).del()
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateProduct({title, price, thumbnail}, id){
        try {
            await db('product').where({id: id}).update({
                title: title,
                price: price,
                thumbnail: thumbnail
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}