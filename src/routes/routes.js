const { getIndex, postProductos, postMensajes } = require('../controller/index')
const { getLogin, postLogin } = require('../controller/login')
const { getLogout } = require('../controller/logout')
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

    //INDEX
    .get('/', isLogged, getIndex)
    .post('/productos', postProductos)
    .post('/mensajes', postMensajes)

    //SIGN UP


    //LOGIN
    .get('/login', getLogin)
    .post('/login', postLogin)

    //LOGOUT    
    .get('/logout', getLogout)    
    
    
    return router
}