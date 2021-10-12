const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { validatePassword, generatePassword } = require('../utils/passportUtils')
const userModel = require('../dao/models/user')

const loginVerifyCallback = (req, username, password, done)=>{
    userModel.findOne({username})
        .then(async (user)=>{
            if (!user) { return done(null, false)}

            const isValid = validatePassword(password, user.hash, user.salt)
            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err)=>{
            done(err)
        })
}
const loginStrategy = new LocalStrategy({
    passReqToCallback: true
}, loginVerifyCallback)

passport.use('login', loginStrategy)


const signupVerifyCallback = (req, username, password, done)=>{
    userModel.findOne({username})
        .then(async (user)=>{           
            if(user) return done(null, false)
            else {
                const saltHash = generatePassword(password)
                const { salt, hash } = saltHash
                const newUser = {
                    username,
                    hash,
                    salt
                }
                userModel.create(newUser)
                    .then((user)=>{
                        return done(null, user)
                    })
                    .catch((err)=>{ done(err) })
            }
        })
        .catch((err)=>{ done(err) })
}
const signupStrategy = new LocalStrategy(
    {passReqToCallback: true},
    signupVerifyCallback
)

passport.use('signup', signupStrategy)


passport.serializeUser((user, done)=>{
    done(null, user._id)
})
passport.deserializeUser((id, done)=>{
    userModel.findById(id, (err, user)=>{
        done(err, user)
    })
})