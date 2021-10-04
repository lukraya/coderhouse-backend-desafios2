

class ErrorController {
    async getFaillogin (req, res){
        res.render('./pages/login-fail')
    }

    async getFailsignup (req, res){
        res.render('./pages/signup-fail')
    }
}

module.exports = new ErrorController