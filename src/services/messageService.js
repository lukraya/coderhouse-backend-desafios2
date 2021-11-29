const messageModel = require('../dao/models/message')

const messageService = (models)=>({
    async createMessage(message){
        try {
            const newMsg = await messageModel.create(message)
            return newMsg
        } catch (error) {
            console.log(error)
        }
    },

    async getAllMessages(){
        try {
            let msgs = await messageModel.find().lean()
            return msgs
        } catch (error) {
            console.log(error)
        }
    },

    async updateMessage(id, data){
        try {
            const messageUpdated = await messageModel.findByIdAndUpdate(id, data, {
                new: true,
            })
            return messageUpdated
        } catch (error) {
            console.log(error)
        }
    },

    async deleteMessage(id){
        try {
            await messageModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = messageService