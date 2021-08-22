const MessageService = require('../services/message')

const messageService = new MessageService()

class MessageController {
    async createMessage(mensaje){    
        await messageService.createMessage(mensaje)
    }

    async listMessages(){
        try {
            let msgs = await messageService.listMessages()
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        await messageService.deleteMessage(id)
    }

    async updateMessage(changes, id){
        await messageService.updateMessage(changes, id)
    }
}

module.exports = new MessageController