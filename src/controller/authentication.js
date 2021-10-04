
class AuthenticationController {
    async getLogin (req, res){
        res.render('./pages/login')
    }

    async getSignup (req, res){
        res.render('./pages/signup')
    }

    async getFaillogin (req, res){
        res.render('./pages/login-fail')
    }

    async getFailsignup (req, res){
        res.render('./pages/signup-fail')
    }

    async getLogout (req, res){
        const username = req.user.username
        req.logout()

        res.render('./pages/logout', {layout: 'loggedout', username})
    }
}

module.exports = new AuthenticationController