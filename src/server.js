const express = require('express')
const cors = require('cors')
const compression = require('compression')

const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const productos = require('./Productos')
const mensajes = require('./Messages')

app.use('/static', express.static('static'))
app.use(express.json())
app.use(cors())
app.use(compression())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
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

io.on('connection', (socket)=>{
    socket.emit('mensajes', {mensajes: mensajes.listarMensajes})
    socket.on('nuevo-mensaje', (mensaje)=>{
        mensajes.newMsj(mensaje)
        //mensaje.fecha = dayjs().format('DD/MM/YYYY HH:mm:ss')
        io.sockets.emit('enviar-mensaje', {mensajes: mensajes.listarMensajes})
    })
    socket.emit('productos', {productos: productos.listarProductos})
    socket.on('nuevo-producto', (producto)=>{
        productos.newProd(producto)     
        io.sockets.emit('enviar-productos', {productos: productos.listarProductos})
    })
})

module.exports = server

