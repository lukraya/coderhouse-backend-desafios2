const MessageService = require('../services/message')
const messageService = new MessageService

class MessageController {
    async createMessage(mensaje){        
        await messageService.createMessage(mensaje)
    }
    
    async getAllMessages(){
        try {
            let msgs = await messageService.getAllMessages()
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async updateMessage(id, data){
        await messageService.updateMessage(id, data)
    }

    async deleteMessage(id){
        await messageService.deleteMessage(id)
    }
}

module.exports = new MessageController