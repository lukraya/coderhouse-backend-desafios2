const logger = require('../logs/logger')
const logInfo = logger.getLogger()
const logWarnCons = logger.getLogger('consoleWarn')
const logWarnFile = logger.getLogger('fileWarn')
const logErrCons = logger.getLogger('consoleErr')
const logErrFile = logger.getLogger('fileErr')

const mainController = ({ productService, messageService, notificationService })=>({
    async getIndex(req, res) {
        try {
            //const { firstName, lastName, email, picture} = req.user
            const products = await productService.getAllProducts()
            const messages = await messageService.getAllMessages()
            
            const result = {
                /* user: {
                    username: `${firstName} ${lastName}`,
                    email,
                    picture
                }, */
                products,
                messages
            }
             
            res.json(result)
            //res.render('./pages/home', {messages, products, username, email, picture})

        } catch (error) {
            //console.log(error)
            logErrCons.error(`Error: ${error}`)
            logErrFile.error(`Error: ${error}`)
            res.send('Hubo un error')
        }
    },

    async postProductos(req, res) {
        try {
            const prod = req.body
            await productService.createProduct(prod)
            res.redirect('/')

        } catch (error) {
            //console.log(error)
            logErrCons.error(`Error: ${error}`)
            logErrFile.error(`Error: ${error}`)
            res.send('Hubo un error')
        }
    },

    async postMensajes(req, res) {
        try {
            const {email, nombre, apellido, edad, alias, avatar, mensaje} = req.body
            
            if(mensaje.includes("administrador")) {
                notificationService.alertSms(email, mensaje)
            }

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
            //console.log(error)
            logErrCons.error(`Error: ${error}`)
            logErrFile.error(`Error: ${error}`)
            res.send('Hubo un error')
        }
    }
})

module.exports = mainController