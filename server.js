const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const router = express.Router()

const session = require("express-session")
const { SESSION_SECRET } = require("./src/config/globals")
const cookieParser = require("cookie-parser")
const MongoStore = require('connect-mongo')
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const handlebars = require("express-handlebars")
const cors = require('cors')
const compression = require('compression')

//Configuración de motor de plantilla
app.engine(
    "hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
        layoutsDir: "./views/layouts",
        partialsDir: "./views/partials",    
    })
);
// Establece el motor de plantilla a utilizar
app.set("view engine", "hbs")
// Establece el directorio donde se encuentran los archivos de plantillas
app.set("views", './views')

//Middleware session
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://user-coder:8XCxwH8FgZCPcAQ9@backendch.yfq2r.mongodb.net?retryWrites=true&w=majority',
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
  
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(compression())
app.use('/static', express.static('static'))

//Las rutas después de json o urlencoded!!
const routes = require('./src/routes/routes')
app.use(routes(router))


module.exports = server