const ProductService = require('./productService')
const MessageService = require('./messageService')
const NotificationService = require('./notificationService')
const models = require('../dal/models')
const { productDao } = require('../dal/dao')
const { messageRepository } = require('../dal/repositories')

//"Singleton" classes: clases instanciadas una sola vez, en tiempo de compilación
module.exports = {
    productService: new ProductService(productDao),
    messageService: new MessageService(messageRepository),
    notificationService: new NotificationService()
}