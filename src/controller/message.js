const MessageService = require('../services/message')
const message = new MessageService

class MessageController {
    async createMessage(mensaje){        
        await message.createMessage(mensaje)
    }
    
    async getAllMessages(){
        try {
            let msgs = await message.getAllMessages()
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async updateMessage(id, data){
        await message.updateMessage(id, data)
    }

    async deleteMessage(id){
        await message.deleteMessage(id)
    }
}

module.exports = new MessageController