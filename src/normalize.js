const { schema, normalize } = require('normalizr')

const userSchema = new schema.Entity('authors')

const entrySchema = new schema.Entity('entries', {
    author: userSchema,    
}, {idAttribute: (value) => value._id.toString()})

const chatSchema = new schema.Entity('chat', {
    content: [entrySchema]
})

const normalizeData = (data)=>{
    const normalizedData = normalize(data, chatSchema)
    //console.log(normalizedData.entities)
    return normalizedData
}

module.exports = normalizeData