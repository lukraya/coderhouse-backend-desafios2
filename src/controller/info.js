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
}

module.exports = new InfoController