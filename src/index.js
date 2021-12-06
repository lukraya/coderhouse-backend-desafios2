const { MODO_EJECUCION, PORT,} = require('./config/globals')
const {getConnection} = require('./dal/db/connection')
const server = require('./server')

if(MODO_EJECUCION==="CLUSTER") {
    const cluster = require('cluster')
    const numCPUs = require('os').cpus().length

    if(cluster.isMaster) {
        //console.log(numCPUs)
        //console.log(`PID Master: ${process.pid}`)

        for(let i=0; i<numCPUs; i++){
            cluster.fork()
        }

        cluster.on('exit', worker => {
            //console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    }
    else {
        getConnection().then((message)=>{
            console.log(message)
            server.listen(PORT, (err) => {
                if (err) {console.log(err);}
                else {
                    console.log("Server listening on PORT", PORT)
                    /* console.log("Enviroment: ", NODE_ENV) */
                }
            })
        }).catch(console.log)
    }
}
else {
    getConnection().then((message)=>{
        console.log(message)
        server.listen(PORT, (err) => {
            if (err) {console.log(err);}
            else {
                console.log(`Server listening on PORT ${PORT} - PID WORKER ${process.pid}`)
                /* console.log("Enviroment: ", NODE_ENV) */
            }
        })
    }).catch(console.log)
}


/* process.on('exit', code => {
    console.log('Salida con código: ' + code)
}) */

//process.exit(2)