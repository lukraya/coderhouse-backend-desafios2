const {PORT} = require('./config/globals')
const server = require('./server')

server.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
})