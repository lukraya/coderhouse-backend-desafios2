const express = require('express')
const cors = require('cors')
const compression = require('compression')
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const productos = require('./Productos')
const mensajes = require('./Messages')

app.use('/static', express.static('static'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(compression())

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: {
          maxAge: 60 * 1000
      }
    })
)
app.use(cookieParser())


app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})
app.post('/login', (req, res)=>{
    console.log(`RECEIVED ${req.body}`)
    if (!req.body.user) throw new Error("No ingresó un usuario")
    const { user } = req.body
    req.session.user = user
    res.redirect('/')
})

let username;
app.get('/', (req, res) => {
    if(res.session.user) {
        username = req.session.user
        res.sendFile(__dirname + '/index.html')
    }

    
})

//PRUEBAS EN POSTMAN
app.get('/:id', (req, res)=>{
    const {
        params: {id}
    } = req;
    productos.getProd(id).then(val=>{res.send(val)})
})
app.put('/:id', (req, res)=>{
    const {
        body,
        params: {id}
    } = req;
    productos.actualizarProducto(id, body)
    res.send(`Producto actualizado`)
})
app.delete('/:id', (req, res)=>{
    const {
        params: {id}
    } = req;
    productos.eliminarProducto(id)
    res.send(`Producto eliminado`)
})

io.on('connection', async (socket)=>{
    //console.log("nuevo socket")
    socket.emit('productos', {productos: productos.listarProductos})
    socket.on('nuevo-producto', (producto)=>{
        productos.newProd(producto)     
        io.sockets.emit('enviar-productos', {productos: productos.listarProductos})
    })

    let chatHistory = await mensajes.listarMensajes()
    socket.emit('mensajes', chatHistory)
    socket.on('nuevo-mensaje', async (mensaje)=>{
        mensajes.newMsj(mensaje)
        //mensaje.fecha = dayjs().format('DD/MM/YYYY HH:mm:ss')
        chatHistory = await mensajes.listarMensajes()
        io.sockets.emit('enviar-mensaje', chatHistory)
    })    
})

module.exports = server

