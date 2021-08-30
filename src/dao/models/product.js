const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    title: String,
    price: Number,
    thumbnail: String,
}, {collection: 'productos'})

module.exports = model('Product', productSchema)
