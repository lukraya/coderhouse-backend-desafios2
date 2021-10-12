const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const { FB_TEST_APP_ID, FB_TEST_APP_SECRET } = require('../config/globals')
const userFbModel = require('../dao/models/userFb')


const loginVerifyCallback = (accessToken, refreshToken, profile, done)=>{
    //console.log(profile._json)
    const { id, last_name, first_name, picture, email } = profile._json
    const { url } = picture.data
    
    userFbModel.findOne({email})
        .then(async (user)=>{
            if(!user){
                const user = {
                    facebookId: id,
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    picture: url
                }

                userFbModel.create(user)
                    .then((user)=>{
                        return done(null, user)
                    })
                    .catch((err)=>{ done(err) })
            } else {
                return done(null, user)
            }
        })
        .catch((err)=>{ done(err) })

    /* userFbModel.findOrCreate(user, (err, user, created)=>{
        if (err) return done(err)
        
        return done(null, user)
    }) */
}
const loginStrategy = new FacebookStrategy({
    clientID: FB_TEST_APP_ID,
    clientSecret: FB_TEST_APP_SECRET,
    callbackURL: `http://localhost:9000/login-facebook/view`,
    profileFields: ['id', 'name', 'photos', 'email'],
    scope: ['email']
}, loginVerifyCallback)

passport.use('facebook', loginStrategy)


passport.serializeUser((user, done)=>{
    //console.log(`user en serialize: ${user}`)
    done(null, user._id)
})
passport.deserializeUser((id, done)=>{
    //console.log('entra en deserialize')
    userFbModel.findById(id, (err, user)=>{
        done(err, user)
    })
})
//VER QUÉ HACEN SERIALIZA Y DESERIALIZE