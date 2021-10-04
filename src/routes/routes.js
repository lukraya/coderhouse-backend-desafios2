const { getIndex, postProductos, postMensajes } = require('../controller/index')
const { getLogin, postLogin } = require('../controller/login')
const { getSignup, postSignup } = require('../controller/signup')
const { getLogout } = require('../controller/logout')
const { getFaillogin, getFailsignup } = require('../controller/error')
const passport = require('passport')
require('../auth/passport')


const isLogged = (req, res, next)=>{
    if (req.isAuthenticated()){
        next()
    } else {
        console.log('No loggeó un usuario. Redirecciona a /login.')
        return res.redirect('/login')
    }
    /* if (!req.session.user) {
        console.log('No hay sesión. Redirecciona a /login.')
        return res.redirect('/login')
    }
    next() */
}

module.exports = (router) =>{
    router

    //INDEX
    .get('/', isLogged, getIndex)
    .post('/productos', postProductos)
    .post('/mensajes', postMensajes)
    
    //LOGIN
    .get('/login', getLogin)
    .post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' })/* , postLogin */)
    //SIGN UP
    .get('/signup', getSignup)
    .post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/login'})/* , postSignup */)
    //LOGOUT    
    .get('/logout', getLogout)   
    
    //ERROR
    .get('/faillogin', getFaillogin)
    .get('/failsignup', getFailsignup)
    
    
    return router
}