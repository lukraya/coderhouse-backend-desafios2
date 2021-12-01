const productDao = require('./productDao')
const { productModel } = require('../models')

module.exports = {
    productDao: productDao(productModel)
}