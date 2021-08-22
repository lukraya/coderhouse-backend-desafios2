const MessageDAO = require('../models/dao/message')

const messageDao = new MessageDAO()

module.exports = class MessageService {
    async createMessage(message){        
        return messageDao.createMessage(message)        
    }

    async listMessages(){
        try {
            let msgs = messageDao.listMessages()
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        await messageDao.deleteMessage(id)
    }

    async updateMessage(changes, id){
        await messageDao.updateMessage(changes, id)
    }
}