const { SESSION_SECRET, MONGO_URI } = require("./config/globals")

//Server
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
//const router = express.Router()

//db
const MongoStore = require('connect-mongo')
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}

//Authentication
const passport = require('passport')
const session = require("express-session")
//require('./src/auth/passportLocal')
require('./auth/passportFacebook')

//Require middlewares
const cookieParser = require("cookie-parser")
const cors = require('cors')
const compression = require('compression')
//const handlebars = require("express-handlebars")

//Configuración de motor de plantilla
/* app.engine(
    "hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "main.hbs",
        layoutsDir: "./src/views/layouts",
        partialsDir: "./src/views/partials",    
    })
);
// Establece el motor de plantilla a utilizar
app.set("view engine", "hbs")
// Establece el directorio donde se encuentran los archivos de plantillas
app.set("views", './src/views') */

//Middleware session
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            mongoOptions,
        }),
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 600 * 1000
        }
    })
)

//Setting middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use('/static', express.static('static'))


//GRAPHQL
const { graphqlHTTP } = require('express-graphql')
const { schema, root } = require('./services/graphqlService')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


//Las rutas después de json o urlencoded!!
const routes = require('./routes')
app.use(routes(/* router */))

module.exports = server