const ProductService = require('../services/product')
const productService = new ProductService
const MessageService = require('../services/message')
const messageService = new MessageService

class IndexController {
    async getIndex (req, res){
        try {
            const products = await productService.getAllProducts()
            const messages = await messageService.getAllMessages()
            //const username = req.user.username
            const username = `${req.user.firstName} ${req.user.lastName}`
            const email = req.user.email
            const picture = req.user.picture
            
            res.render('./pages/home', {messages, products, username, email, picture})

        } catch (error) {
            console.log(error)
            res.send('Hubo un error')
        }
    }

    async postProductos (req, res){
        try {
            const prod = req.body
            await productService.createProduct(prod)
            res.redirect('/')

        } catch (error) {
            console.log(error)
            res.send('Hubo un error')
        }
    }

    async postMensajes (req, res){
        try {
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

        } catch (error) {
            console.log(error)
            res.send('Hubo un error')
        }
    }
}

module.exports = new IndexController