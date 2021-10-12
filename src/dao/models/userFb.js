const { Schema, model} = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const userFbSchema = new Schema({
    facebookId: String,
    firstName: String,
    lastName: String,
    email: {unique: true, type: String},
    picture: String
}).plugin(findOrCreate)

module.exports = model('UserFb', userFbSchema)