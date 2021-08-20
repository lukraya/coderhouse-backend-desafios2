const MessageService = require('../services/message')

exports.messageController = async (mensaje)=>{
    const message = new MessageService()
    await message.createMessage(mensaje)
}