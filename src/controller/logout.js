

class LogoutController {
    async getLogout (req, res){
        const username = req.user.username
        req.logout()

        res.render('./pages/logout', {layout: 'loggedout', username})
    }
}

module.exports = new LogoutController