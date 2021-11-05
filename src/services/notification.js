const nodemailer = require('nodemailer')
const moment = require('moment')
const { PASS_GMAIL, USER_GMAIL, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, ADMIN_PHONE } = require('../config/globals')
const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const transporterEthereal = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "kurtis.bernhard37@ethereal.email",
        pass: "M2h485GCD2MR9n1mCb",
    },
    //Fix para error "self signed certificate in certificate chain"
    tls: {
        rejectUnauthorized: false
    }
})

const transporterGmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: USER_GMAIL,
      pass: PASS_GMAIL,
    },
    //Fix para error "self signed certificate in certificate chain"
    tls: {
        rejectUnauthorized: false
    }
})

const sendEthereal = async (event, username) => {
    await transporterEthereal.sendMail({
        from: 'Alerta de servidor',
        to: 'kurtis.bernhard37@ethereal.email',
        subject: `${event} de ${username}`,
        html: `${event} de ${username}, con fecha ${moment().format("DD/MM/YYYY hh:mm:ss")}`
    })
}

const sendGmail = async (username, email, photo) => {
    await transporterGmail.sendMail({
        from: 'Alerta de servidor',
        to: email,
        subject: `Loggeo exitoso con tu usuario de Facebook: ${username}, con fecha ${moment().format("DD/MM/YYYY hh:mm:ss")}`,
        html: `<p>Bienvenide, ${username}</p>
            <img src="${photo}">`,
        attachments: [{
            path: photo,
            filename: "profilPic.jpeg",
            contentType: "image/jpeg"
        }] 
    })
}

class NotificationService {
    async alertMail (event, username, email, photo) {
        try {
            await sendEthereal(event, username)

            if (event === 'Login' && email && photo) {
                try {
                    await sendGmail(username, email, photo)
                } catch (error) {
                    console.log(`Error en mail gmail: ${error}`)
                }
            }
        } catch (error) {
            console.log(`Error en mail ethereal: ${error}`)
        }
    }

    async alertSms (email, message) {
        try {
            await twilioClient.messages.create({
                body: `Mensaje de ${email}: ${message}`,
                from: '+13203387865',
                to: ADMIN_PHONE
            })
            console.log('Mensaje enviado')
        } catch (error) {
            console.log(`Error al enviar sms: ${error}`)
        }
    }
}

module.exports = new NotificationService