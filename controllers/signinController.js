const OtpModel = require("../schema/Otp")
// const { sendMail } = require("../helpers")
const UserModel = require("../schema/User")
const { BadRequestError, NotFoundError } = require("../errors")
const attachCookie = require("../utils/attachCookie")
const jwt = require("jsonwebtoken")
const generateTokens = require("../utils/generateTokens")
const sendMail = require("../utils/sendMail")
const getEmailMsgTemplate = require("../utils/getEmailMsgTemplate")

const send_otp = async (req, res) => {
  const email = req.body.email
  if (!email) {
    // throw new BadRequestError("please provide email")
    return res.status(400).json({
      status: false,
      message: "please provide email",
    })
  }
  const [localPart, domainPart] = email.split("@")
  const lowercaseLocalPart = localPart.toLowerCase()
  const lowercaseEmail = `${lowercaseLocalPart}@${domainPart}`

  const user = await UserModel.findOne({ email: lowercaseEmail })
  if (!user) {
    // throw new NotFoundError("user does not exist")
    return res.status(404).json({
      status: false,
      message: "user does not exist",
    })
  }
  const otp = Math.floor(100000 + Math.random() * 900000)

  const values = {
    email: lowercaseEmail,
    otp: otp,
    is_used: false,
    created_on: new Date(),
    updated_on: new Date(),
  }
  const result = await OtpModel.create(values)

  if (result) {
    const subject = "Your One Time Password"
    //console.log("user:   " ,user)
    const html = await getEmailMsgTemplate(
      ` <h4 style="text-align:center;font-weight:500">Please enter the OTP to get started</h4>
          <h2 style="text-align:center;color: #5626c4;letter-spacing:3px !important ;">${otp}</h2>
        `
    )

    sendMail(lowercaseEmail, subject, html)

    return res.status(200).json({ status: true, message: "Otp sended to mail" })
  }
}

const verify_otp = async (req, res) => {
  const { otp, email } = req.body

  if (!otp || !email) {
    // throw new BadRequestError("OTP and email not provided")
    return res.status(400).json({
      status: false,
      message: "OTP and email not provided",
    })
  }

  // Check if OTP is alphabetic
  if (isNaN(otp)) {
    return res.status(400).json({
      status: false,
      message: "OTP is incorrect",
    })
  }

  const [localPart, domainPart] = email.split("@")
  const lowercaseLocalPart = localPart.toLowerCase()
  const lowercaseEmail = `${lowercaseLocalPart}@${domainPart}`

  const data = await OtpModel.findOne({ email: lowercaseEmail, otp })

  if (!data) {
    return res.status(400).json({
      status: false,
      message: "OTP is incorrect",
    })
  }

  // const user = await UserModel.findOne({ email })
  const user = await UserModel.findOne({ email: lowercaseEmail })

  if (!user) {
    return res.status(200).json({
      status: false,
      message: "User does not exist",
    })
  }

  if (!user.is_active) {
    return res.status(403).json({
      status: false,
      message: "Please contact the administrator for assistance",
    })
  }

  // await OtpModel.updateOne(
  //   {
  //     email: email,
  //     otp: otp,
  //   },
  //   {
  //     $set: {
  //       is_used: true,
  //       updated_on: new Date(),
  //     },
  //   }
  // );
  // delete the otp after use

  // await OtpModel.findOneAndDelete({ email: email, otp: otp })
  await OtpModel.findOneAndDelete({ email: lowercaseEmail, otp: otp })

  const { accessToken, refreshToken } = await generateTokens(user)

  return res.status(200).json({
    status: true,
    user: user,
    accessToken,
    refreshToken,
  })
}

const verify_email = async (req, res) => {
  const email_token = req.body.token
  let data = await UserModel.findOne({ email_token: email_token })

  if (!data) {
    // throw new BadRequestError("Email does not exist")
    return res.status(400).json({
      status: false,
      message: "Email does not exist",
    })
  }
  // else update the isactive to true and also send tokens in response

  if (!data.is_active) {
    return res.status(403).json({
      status: false,
      message:
        "User is not active. Please contact the administrator for assistance.",
    })
  }

  const update = await UserModel.findOneAndUpdate(
    { email_token: email_token },
    { is_active: true }
  )

  const { accessToken, refreshToken } = await generateTokens(data)

  res.status(200).json({
    status: true,
    message: "Email verified",
    user: data,
    accessToken,
    refreshToken,
  })
}

module.exports = { send_otp, verify_otp, verify_email }
