const mainController = require('./mainController')
const authController = require('./authController')
const infoController = require('./infoController')
const services = require('../services')

module.exports = {
    mainController: mainController(services),
    authController: authController(services),
    infoController: infoController()
}