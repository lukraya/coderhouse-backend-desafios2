const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//const getConnection = require('../dao/db/connection')
const { validatePassword, generatePassword } = require('../utils/passportUtils')
const userModel = require('../dao/models/user')

const loginVerifyCallback = (req, username, password, done)=>{
    userModel.findOne(/* {'username': username} */ {username})
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

//passport.use(strategy(verifyCallback))
/* passport.use(
    'login', new LocalStrategy({
        passReqToCallback: true
    },
    (username, password, done)=>{
        userModel.findOne({'username': username},
        (err, user)=>{
            if (err) { return done(err) } 
            
            if (!user) { return done(null, false) }
            
            const isValid = validatePassword(password, user.hash, user.salt)
            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    })
) */

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

/* passport.use(
    'signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done)=>{
        console.log('llegó al strategy para signup')
        findOrCreateUser = ()=>{
            userModel.findOne({'username': username}, 
            (err, user)=>{
                if(err){
                    console.log('Error al registrarse')
                    return done(err)
                } else if (user) {
                    //console.log('User already exists')
                    return done(null, false, 
                        console.log('message', 'User already exists'))
                } else {
                    let newUser = {
                        username,
                        password: createHash(password)
                    }
                    userModel.create(newUser)
                    return done(null, newUser)
                }
            })
        }

        process.nextTick(findOrCreateUser)
    })
) */

passport.serializeUser((user, done)=>{
    done(null, user._id)
})
passport.deserializeUser((id, done)=>{
    userModel.findById(id, (err, user)=>{
        done(err, user)
    })
})