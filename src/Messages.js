const messageController = require('./controller/message')

class Mensaje {
    mensajes = [];
    id = 0;

    async nuevoMsj(mensaje) {
        await messageController.createMessage(mensaje)
    }

    mostrarMsj(id) {
        let msj = this.mensajes.find(mensaje =>{
            return mensaje.id == id
        });
        if (msj == undefined) {
            return '{error: "Producto no encontrado."}'
        }

        return msj
    }

    get listarMensajes() {
        messageController.listMessages().then(val=>{this.mensajes = val})
        return this.mensajes
    }

    async actualizarMensaje(cambios, id) {
        await messageController.updateMessage(cambios, id)
    }

    async eliminarMensaje(id) {
        await messageController.deleteMessage(id)
    }
}

module.exports= new Mensaje