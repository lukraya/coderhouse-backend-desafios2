const mongoose = require('mongoose')
const {MONGO_URI} = require('../../config/globals')

exports.getConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return "Connection Successful!"
    } catch (error) {
        return "Connection Failed!"
    }
};