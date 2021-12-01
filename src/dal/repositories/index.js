const { messageModel } = require('../models')
const messageRepository = require('./messageRepository')

module.exports = {
    messageRepository: messageRepository(messageModel),
}