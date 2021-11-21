const crypto = require('crypto')

exports.validatePassword = (password, hash, salt)=>{
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}
exports.generatePassword = (password)=>{
    const salt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        salt,
        hash: genHash
    }
}