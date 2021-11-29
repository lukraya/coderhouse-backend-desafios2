require('dotenv').config()

module.exports = {
    MODO_EJECUCION: process.argv[2] || 'FORK',
    PORT: process.argv[3] || process.env.PORT || 9000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || "",    
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    FB_TEST_APP_ID: process.argv[4] || process.env.FB_TEST_APP_ID || 457681462224209,
    FB_TEST_APP_SECRET: process.argv[5] || process.env.FB_TEST_APP_SECRET || 'c4430bc93a8fea949fd85cf44d4d9fa8',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PASS_GMAIL: process.env.PASS_GMAIL,
    USER_GMAIL: process.env.USER_GMAIL,
    ADMIN_PHONE: process.env.ADMIN_PHONE
}