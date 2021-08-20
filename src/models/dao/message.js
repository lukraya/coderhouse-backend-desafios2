const db = require('../db/db')

module.exports = class MessageDAO {
    async createMessage({email, mensaje}){
        try {
            await db('messages').insert({
                email,
                mensaje,
            })
        }
        catch (error){
            console.log(error)
        }
    }
}