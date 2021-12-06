//require('dotenv').config()

const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve('./', process.env.NODE_ENV.trim() + '.env')
})

//const args = require('yargs').argv //Con --port=9000 (después de npm run dev) ni aparece el 9000 en el array
const args = require('minimist')(process.argv.slice(2)) //Aparece 9000 en el array pero no asocia el tag (escrito "-p 9000")
console.log(args)
module.exports = {
    PORT: args._[0] || 8080,
    MODO_EJECUCION: process.env.MODO_EJECUCION || 'none',
    NODE_ENV: process.env.NODE_ENV || 'develop',
    MONGO_URI: process.env.MONGO_URI || "",    
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    FB_TEST_APP_ID: process.env.FB_TEST_APP_ID || 457681462224209,
    FB_TEST_APP_SECRET: process.env.FB_TEST_APP_SECRET || 'c4430bc93a8fea949fd85cf44d4d9fa8',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PASS_GMAIL: process.env.PASS_GMAIL,
    USER_GMAIL: process.env.USER_GMAIL,
    ADMIN_PHONE: process.env.ADMIN_PHONE,
}