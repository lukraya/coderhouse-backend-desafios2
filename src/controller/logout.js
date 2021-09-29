

class LogoutController {
    async getLogout (req, res){
        const username = req.session.user
        req.session.destroy((err) => console.log("session destroyed"))

        res.render('./pages/logout', {layout: 'loggedout', username})
    }
}

module.exports = new LogoutController