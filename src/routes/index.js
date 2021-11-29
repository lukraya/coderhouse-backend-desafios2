const router = require('express').Router()
const { mainController, authController, infoController } = require('../controller')
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

module.exports = routerConfig = () => {
    router

    //MAIN
    .get('/', isLogged, mainController.getIndex)
    //.post('/productos', postProductos)
    .post('/mensajes', mainController.postMensajes)
    
    //AUTHENTICATION
    //Login
    .get('/login', authController.getLogin)
    //.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }))
    //Signup
    .get('/signup', authController.getSignup)
    //.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/login' }))
    //Facebook
    .get('/login-facebook', passport.authenticate('facebook'))
    .get('/login-facebook/view', passport.authenticate('facebook', {/* successRedirect: '/', */ failureRedirect: '/faillogin'}), authController.login)
    //Error
    .get('/faillogin', authController.getFaillogin)
    .get('/failsignup', authController.getFailsignup)
    //Logout
    .get('/logout', authController.getLogout)

    //INFO Y RANDOM
    .get('/info', infoController.getInfo)
    //Desactivo endpoint de randoms para desafio 32
    //.get('/randoms/:cant?', getRandoms)
    
    return router
}