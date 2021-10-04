const { generatePassword } = require('../utils/passportUtils')
const userModel = require('../dao/models/user')

class SignupController {
    async getSignup (req, res){
        res.render('./pages/signup')
    }

    postSignup (req, res){
        console.log('llegó a post signup')
        const {username, password} = req.body
        const saltHash = generatePassword(password)
        const {salt, hash} = saltHash
        const newUser = new userModel({
            username,
            hash,
            salt
        })
        newUser.save()
            .then((user)=>{
                console.log(user)
            })
        res.redirect('/login')
        /* const { username } = req.body
        req.session.username = username
        res.redirect('/') */
    }
}

module.exports = new SignupController