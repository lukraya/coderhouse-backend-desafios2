const { fork } = require('child_process')

class InfoController {
    getInfo (req, res) {
        const info = {
            argumentos: process.argv,
            plataforma: process.platform,
            version: process.version,
            memoria: JSON.stringify(process.memoryUsage()),
            path: process.execPath,
            id: process.pid,
            carpeta: process.cwd()
        }

        res.render('./pages/info', {info})
    }

    getRandoms (req, res) {
        const cant = req.params.cant ? req.params.cant : 100000000

        const randoms = fork('./src/utils/getRandomNums.js')
        randoms.send(cant)
        randoms.on('message', result => {
            res.send(`El resultado es ${JSON.stringify(result)}`)
        })
    }
}

module.exports = new InfoController