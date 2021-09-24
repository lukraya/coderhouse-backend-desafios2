const productController = require('../controller/product')
const messageController = require('../controller/message')

const isLogged = (req, res, next)=>{
    if (!req.session.user) {
        console.log('No hay sesión. Redirecciona a /login.')
        return res.redirect('/login')
    }
    next()
}

module.exports = (router) =>{
    router
    .post('/login', (req, res, next)=>{
        if (!req.body.user) throw new Error("No ingresó un usuario")
        const { user } = req.body
        req.session.user = user
        res.redirect('/')
    })
    .get('/', isLogged, async (req, res, next)=>{
        const products = await productController.getAllProducts()
        const messages = await messageController.getAllMessages()
        const username = req.session.user
        
        res.render('./pages/home', {messages, products, username})
    })
    .get('/login', async (req, res, next)=>{
        res.render('./pages/login')
    })
    .get('/logout', async (req, res, next)=>{
        const username = req.session.user
        req.session.destroy((err) => console.log("session destroyed"))

        res.render('./pages/logout', {layout: 'loggedout', username})
    })

    .post('/productos', async (req, res, next)=>{
        //console.log(req.body)
        const prod = req.body
        await productController.createProduct(prod)
        res.redirect('/')
    })
    .post('/mensajes', async (req, res, next)=>{
        const {email, nombre, apellido, edad, alias, avatar, mensaje} = req.body
        //console.log(req.body)
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
        await messageController.createMessage(newMsg)
        res.redirect('/')
    })
    
    
    return router
}