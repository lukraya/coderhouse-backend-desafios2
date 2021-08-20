const express = require('express')
const cors = require('cors')
const compression = require('compression')

const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const {productController} = require('./controller/product')
const productos = require('./Productos')

app.use('/static', express.static('static'))
app.use(express.json())
app.use(cors())
app.use(compression())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    /* socket.emit('mensajes', mensajes)
    socket.on('nuevo-mensaje', (mensaje)=>{
        mensaje.fecha = dayjs().format('DD/MM/YYYY HH:mm:ss')
        mensajes.push(mensaje)
        io.sockets.emit('enviar-mensaje', mensajes)
    }) */
    socket.emit('productos', {productos: productos.listarProductos})
    socket.on('nuevo-producto', (producto)=>{
        productController(producto)
        productos.nuevoProd(producto)     
        io.sockets.emit('enviar-producto', {productos: productos.listarProductos})
    })
})

module.exports = server

/* let productos = require('./Productos')
let mensajes = [] */