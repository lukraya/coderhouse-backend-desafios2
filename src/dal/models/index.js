const { NODE_ENV } = require('../../config/globals')
let productModel = require('./product')
let userModel = require('./userFb')
let messageModel = require('./message')

//"Factoy": instancio un modelo o mock según si estoy en development o staging
if (NODE_ENV.trim() == 'staging') {
    const FakeMessageModel = require('../../../__test__/__mock__/fake-messageModel')
    const fakeData = require('../../../__test__/__mock__')
    messageModel = new FakeMessageModel(fakeData)
}

module.exports = {
    productModel,
    userModel,
    messageModel
}