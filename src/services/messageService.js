const { NODE_ENV } = require('../config/globals')

class MessageService {
    constructor (repository) {
        this.repository = repository
    }

    async createMessage(message){
        try {
            const newMsg = await this.repository.create(message)
            return newMsg
        } catch (error) {
            console.log(error)
        }
    }

    async getAllMessages(){
        try {
            if(NODE_ENV.trim() === 'staging') {
                const msgs = await this.repository.getAll()
                return msgs
            } else {
                const msgs = await this.repository.getAllLean()
                return msgs
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateMessage(id, data){
        try {
            const messageUpdated = await this.repository.update(id, data, {
                new: true,
            })
            return messageUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        try {
            await this.repository.delete(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MessageService