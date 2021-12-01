const baseRepository = require('./baseRepository')

const messageRepository = (model)=> ({
    ...baseRepository(model),
    async getAllLean() {
        const messages = await model.find().lean()
        return messages
    }
})

module.exports = messageRepository