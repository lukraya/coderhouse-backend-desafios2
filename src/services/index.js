const productService = require('./productService')
const messageService = require('./messageService')
const notificationService = require('./notificationService')

module.exports = {
    productService: productService(/* models */),
    messageService: messageService(/* models */),
    notificationService: notificationService()
}