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

