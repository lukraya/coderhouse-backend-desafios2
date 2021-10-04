

class LoginController {
    async getLogin (req, res){
        res.render('./pages/login')
    }

    /* postLogin (req, res){
        const { username } = req.body
        req.session.username = username
        res.redirect('/')
    } */
}

module.exports = new LoginController