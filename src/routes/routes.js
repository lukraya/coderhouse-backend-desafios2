const { getIndex, postProductos, postMensajes } = require('../controller/index')
const { getLogin, getSignup, getFaillogin, getFailsignup, getLogout} = require('../controller/authentication')
//const { getLogin } = require('../controller/login')
//const { getSignup } = require('../controller/signup')
//const { getLogout } = require('../controller/logout')
//const { getFaillogin, getFailsignup } = require('../controller/error')
const passport = require('passport')
require('../auth/passport')


const isLogged = (req, res, next)=>{
    if (req.isAuthenticated()){
        next()
    } else {
        console.log('No loggeó un usuario. Redirecciona a /login.')
        return res.redirect('/login')
    }
}

module.exports = (router) =>{
    router

    //INDEX
    .get('/', isLogged, getIndex)
    .post('/productos', postProductos)
    .post('/mensajes', postMensajes)
    
    //AUTHENTICATION
    //Login
    .get('/login', getLogin)
    .post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }))
    //Signup
    .get('/signup', getSignup)
    .post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/login' }))
    //Error
    .get('/faillogin', getFaillogin)
    .get('/failsignup', getFailsignup)

    //LOGOUT    
    .get('/logout', getLogout)
    
    return router
}