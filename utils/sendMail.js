var nodemailer = require("nodemailer")
var smtpTransport = require("nodemailer-smtp-transport")
const { SMTP_CONFIG, SENDERMAIL } = require("../utils/config")
const path = require("path")

const sendMail = async (recipentEmailID, subject, message) => {
  try {
    var transporter = nodemailer.createTransport(SMTP_CONFIG)

    var mailOptions = {
      from: SENDERMAIL,
      to: recipentEmailID,
      subject: subject,
      html: message,
    }

    mailOptions.attachments = [
      {
        filename: "logo1.png",
        path: path.join(__dirname, "/images/logo1.png"),
        cid: "__tenanzy_logo", //same cid value as in the html img src
      },
    ]

    // mailOptions.attachments.push({
    //   filename: "document.pdf",
    //   path: path.join(__dirname, "/pdf/document.pdf"),
    //   cid: "__tenanzy_document", //same cid value as in the html img src
    // })

    var response = await transporter.sendMail(mailOptions)
    console.log(response)
    return { success: true }
  } catch (e) {
    console.log("Send Mail Error")
    console.log(e)
    return { success: false, message: e.message }
  }
}

module.exports = sendMail
