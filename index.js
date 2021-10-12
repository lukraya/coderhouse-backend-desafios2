const {PORT} = require('./src/config/globals')
const {getConnection} = require('./src/dao/db/connection')
const server = require('./server')

getConnection().then((message)=>{
    console.log(message)
    server.listen(PORT, (err) => {
        if (err) {console.log(err);}
        else {console.log("Server listening on PORT", PORT);}
    })
}).catch(console.log)

process.on('exit', code => {
    console.log('Salida con código: ' + code)
})

//process.exit(2)