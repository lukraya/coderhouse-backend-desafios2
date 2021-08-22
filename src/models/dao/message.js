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

    async listMessages(){
        try {
            let msgs = await db('messages').select()
            return msgs
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteMessage(id){
        try {
            await db('messages').where({id: id}).del()
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateMessage({email, mensaje}, id){
        try {
            await db('messages').where({id: id}).update({
                email: email,
                mensaje: mensaje
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}