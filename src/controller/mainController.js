const logger = require('../logs/logger')
const logInfo = logger.getLogger()
const logWarnCons = logger.getLogger('consoleWarn')
const logWarnFile = logger.getLogger('fileWarn')
const logErrCons = logger.getLogger('consoleErr')
const logErrFile = logger.getLogger('fileErr')

const mainController = ({ productService, messageService, notificationService })=>({
    async getIndex(req, res) {
        try {
            const products = await productService.getAllProducts()
            const messages = await messageService.getAllMessages()
            //const username = req.user.username
            //logWarnCons.warn('El formato de username es específico para inicio con FB')
            //logWarnFile.warn('El formato de username es específico para inicio con FB')
            const username = `${req.user.firstName} ${req.user.lastName}`
            const email = req.user.email
            const picture = req.user.picture
            
           // logInfo.info(`Chequeo qué hay en email: ${email}`)
            
            //logErrCons.error('Pruebo en un try exitoso el log de error')
            //logErrFile.error('Pruebo en un try exitoso el log de error')
            
            res.render('./pages/home', {messages, products, username, email, picture})

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