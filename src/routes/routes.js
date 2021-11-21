const { getIndex, postProductos, postMensajes } = require('../controller/index')
const { getLogin, getSignup, getFaillogin, getFailsignup, getLogout, login} = require('../controller/authentication')
const { getInfo, getRandoms } = require('../controller/info')
const passport = require('passport')
//require('../auth/passportLocal')
require('../auth/passportFacebook')


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
    //.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }))
    //Signup
    .get('/signup', getSignup)
    //.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/login' }))
    //Facebook
    .get('/login-facebook', passport.authenticate('facebook'))
    .get('/login-facebook/view', passport.authenticate('facebook', {/* successRedirect: '/', */ failureRedirect: '/faillogin'}), login)
    //Error
    .get('/faillogin', getFaillogin)
    .get('/failsignup', getFailsignup)

    //LOGOUT    
    .get('/logout', getLogout)

    //INFO Y RANDOM
    .get('/info', getInfo)
    //Desactivo endpoint de randoms para desafio 32
    //.get('/randoms/:cant?', getRandoms)
    
    return router
}