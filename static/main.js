let socket = io()

function enviarMensaje () {
    socket.emit('nuevo-mensaje', {
        author: {
            id: $("#email").val(),
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            edad: $("#edad").val(),
            alias: $("#alias").val(),
            avatar: $("#avatar").val(),
        },        
        text: $("#mensaje").val()
    })
    return false
}

{/* <span class="fecha">[${msj.created_at}]</span> */}
{/* <img src="${author.avatar}" alt="avatar de ${author.alias}" class="avatar"></img> */}
function renderMensajes (mensajes) {
    //console.log(mensajes)
    let elHtml = mensajes.map(({author, text})=>{
        return (`
            <p>
                <span class="email">${author.alias}:</span> <span class="mensaje">${text}</span>                
            </p>
        `)
    })
    $("#mensajes").html(elHtml)
}

socket.on('mensajes', (data)=>{
    //console.log(data)
    const userSchema = new normalizr.schema.Entity('authors')
    const entrySchema = new normalizr.schema.Entity('entries', {
        author: userSchema,    
    }, {idAttribute: (value) => value._id.toString()})
    const chatSchema = new normalizr.schema.Entity('chat', {
        content: [entrySchema]
    })

    const denormalizedData = normalizr.denormalize(data.result, chatSchema, data.entities)

    renderMensajes(denormalizedData.content)
})

socket.on('enviar-mensaje', (data)=>{
    renderMensajes(data)
})



let templateTabla = Handlebars.compile(`
    <table class="table">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Thumbnail</th>
            </tr>
        </thead>
        <tbody>
            {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>{{this.price}}</td>
                    <td>{{this.thumbnail}}</td>
                </tr>
            {{/each}}
        </tbody>
    </table>
`)

let templateVacio = Handlebars.compile(`
    <p id="sinProd">No hay productos</p>
`)

function enviarProducto () {
    socket.emit('nuevo-producto', {
        title: $("#title").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val()
    })
    return false
}

function renderProductos (productos) {
    if (productos.length > 0) {
        let elHtml = templateTabla({productos: productos})
        $("#listado").html(elHtml)
    } else {
        let elHtml = templateVacio()
        $("#listado").html(elHtml)
    }    
}

socket.on('productos', (data)=>{
    //console.log(data)
    renderProductos(data.productos)
})

socket.on('enviar-productos', (data)=>{
    //estoy recibiendo nuevamente la lista, pero sin actualizar
    renderProductos(data.productos)
})