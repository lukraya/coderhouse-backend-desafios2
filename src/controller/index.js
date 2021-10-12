const ProductService = require('../services/product')
const productService = new ProductService
const MessageService = require('../services/message')
const messageService = new MessageService

class IndexController {
    async getIndex (req, res){
        const products = await productService.getAllProducts()
        const messages = await messageService.getAllMessages()
        //const username = req.user.username
        const username = `${req.user.firstName} ${req.user.lastName}`
        const email = req.user.email
        const picture = req.user.picture
        
        res.render('./pages/home', {messages, products, username, email, picture})
    }

    async postProductos (req, res){
        const prod = req.body
        await productService.createProduct(prod)
        res.redirect('/')
    }

    async postMensajes (req, res){
        const {email, nombre, apellido, edad, alias, avatar, mensaje} = req.body
        const newMsg = {
            author: {
                id: email,
                nombre,
                apellido,
                edad,
                alias,
                avatar
            },
            text: mensaje
        }
        await messageService.createMessage(newMsg)
        res.redirect('/')
    }
}

module.exports = new IndexController