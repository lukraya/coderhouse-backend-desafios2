require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI || "",
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    FB_APP_ID: process.env.FB_APP_ID || "",
    FB_APP_SECRET: process.env.FB_APP_SECRET || "",
    FB_TEST_APP_ID: process.env.FB_TEST_APP_ID || "",
    FB_TEST_APP_SECRET: process.env.FB_TEST_APP_SECRET || ""
}