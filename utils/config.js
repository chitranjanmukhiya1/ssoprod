const SMTP_CONFIG = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}

const SENDERMAIL = process.env.MAIL_USER

module.exports = { SMTP_CONFIG, SENDERMAIL }
