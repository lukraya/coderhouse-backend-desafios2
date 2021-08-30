const messageController = require('./controller/message')

class Mensaje {
    mensajes = []

    async newMsj(mensaje) {
        await messageController.createMessage(mensaje)
    }

    get listarMensajes() {
        messageController.getAllMessages().then(val=>{this.mensajes = val})
        return this.mensajes
    }

    async actualizarMensaje(id, cambios) {
        await messageController.updateMessage(id, cambios)
    }

    async eliminarMensaje(id) {
        await messageController.deleteMessage(id)
    }
}

module.exports= new Mensaje