const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
    author: {
        id: {type: String},
        nombre: {type: String},
        apellido: {type: String},
        edad: {type: Number},
        alias: {type: String},
        avatar: {type: String},
    },
    text: {type: String}
}, {collection: 'mensajesnew'})

module.exports = model('Message', messageSchema)