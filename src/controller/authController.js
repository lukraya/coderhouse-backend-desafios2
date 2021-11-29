const authController = ({ notificationService })=>({
    //Rendering
    async getLogin (req, res){
        res.render('./pages/login')
    },
    async getSignup (req, res){
        res.render('./pages/signup')
    },
    async getFaillogin (req, res){
        res.render('./pages/login-fail')
    },
    async getFailsignup (req, res){
        res.render('./pages/signup-fail')
    },

    async getLogout (req, res){
        //const username = req.user.username
        const { email, picture, firstName, lastName } = req.user
        const username = `${firstName} ${lastName}`
        const event = 'Logout'

        notificationService.alertMail(event, username, email, picture)

        req.logout()

        res.render('./pages/logout', {/* layout: 'loggedout', */ username})
    },
    
    async login (req, res){
        //console.log(req.user)
        const { email, picture, firstName, lastName } = req.user
        const username = `${firstName} ${lastName}`
        const event = 'Login'

        notificationService.alertMail(event, username, email, picture)

        res.redirect('/')
    }
})

module.exports = authController