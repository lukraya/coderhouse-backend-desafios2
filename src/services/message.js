const MessageDAO = require('../models/dao/message')

module.exports = class MessageService {
    async createMessage(message){
        const messageDao = new MessageDAO()
        return messageDao.createMessage(message)        
    }
}