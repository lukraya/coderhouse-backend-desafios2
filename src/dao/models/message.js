const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    email: String,
    mensaje: String,
}, {collection: 'mensajes'})

module.exports = model('Message', messageSchema)
