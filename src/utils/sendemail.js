const nodemailer = require('nodemailer');

const sendemail = async ({ email, subject, masseg }) => {
    const transpoter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MATL,
            pass: process.env.SMTP_PASSWORD

        }
    })

    const option = {
        from: process.env.SMTP_MATL,
        to: email,
        subject,
        html: masseg
    }
    await transpoter.sendMail(option)
}

module.exports = sendemail;