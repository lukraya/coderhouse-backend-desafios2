

class LoginController {
    async getLogin (req, res){
        res.render('./pages/login')
    }

    postLogin (req, res){
        if (!req.body.user) throw new Error("No ingresó un usuario")
        const { user } = req.body
        req.session.user = user
        res.redirect('/')
    }
}

module.exports = new LoginController