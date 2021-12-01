class MessageService {
    constructor (models) {
        this.model = models.messageModel
    }

    async createMessage(message){
        try {
            const newMsg = await this.model.create(message)
            return newMsg
        } catch (error) {
            console.log(error)
        }
    }

    async getAllMessages(){
        try {
            let msgs = await this.model.find()/* .lean() */
            return msgs
        } catch (error) {
            console.log(error)
        }
    }

    async updateMessage(id, data){
        try {
            const messageUpdated = await this.model.findByIdAndUpdate(id, data, {
                new: true,
            })
            return messageUpdated
        } catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        try {
            await this.model.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MessageService