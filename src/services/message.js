const messageModel = require('../dao/models/message')

module.exports = class {
    async createMessage(message){
        await messageModel.create(message)
    }

    async getAllMessages(){
        try {
            let msgs = await messageModel.find().lean()
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async updateMessage(id, data){
        const messageUpdated = await messageModel.findByIdAndUpdate(id, data, {
            new: true,
        })
        return messageUpdated
    }

    async deleteMessage(id){
        await messageModel.findByIdAndDelete(id)
    }
}