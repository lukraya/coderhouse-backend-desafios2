const ProductService = require('./productService')
const MessageService = require('./messageService')
const NotificationService = require('./notificationService')
const models = require('../dao/models')

//"Singleton" classes: clases instanciadas una sola vez, en tiempo de compilación
module.exports = {
    productService: new ProductService(models),
    messageService: new MessageService(models),
    notificationService: new NotificationService()
}