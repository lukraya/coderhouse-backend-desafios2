const messageModel = require('../dao/models/message')

module.exports = class {
    async createMessage(message){
        try {
            await messageModel.create(message)
        } catch (error) {
            console.log(error)
        }
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
        try {
            const messageUpdated = await messageModel.findByIdAndUpdate(id, data, {
                new: true,
            })
            return messageUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        try {
            await messageModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
}