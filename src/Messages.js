const messageController = require('./controller/message')
const normalizeData = require('./normalize')

class Mensaje {
    mensajes = []

    async newMsj(mensaje) {
        await messageController.createMessage(mensaje)
    }

    /* get listarMensajes() {
        let toNormalize;
        let normalizedData;
        messageController.getAllMessages().then(val=>{
            toNormalize = {
                id: 1,
                content: val
            }
        }).then(()=> normalizedData = normalizeData(toNormalize))
        
        return normalizedData
    } */
    async listarMensajes () {
        const content = await messageController.getAllMessages()
        const toNormalize = {
            id: 1,
            content: content
        }
        //console.log(toNormalize)
        const normalizedData = normalizeData(toNormalize)
        //console.log(normalizedData.entities.chat)
        
        return normalizedData
    }

    async actualizarMensaje(id, cambios) {
        await messageController.updateMessage(id, cambios)
    }

    async eliminarMensaje(id) {
        await messageController.deleteMessage(id)
    }
}

module.exports= new Mensaje