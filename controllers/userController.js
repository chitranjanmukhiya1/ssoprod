const { BadRequestError, NotFoundError } = require("../errors")
const UserModel = require("../schema/User")
const jwt = require("jsonwebtoken")
const getEmailMsgTemplate = require("../utils/getEmailMsgTemplate")
const getButtonTemplate = require("../utils/getButtonTemplate")
const sendMail = require("../utils/sendMail")
const validator = require("validator")

const signup2 = async (req, res) => {
  const {
    name,
    email,
    contact_number,
    country,
    address,
    role,
    education_qualification,
    work_experience,
    skills,
    job_title,
    department,
    reporting_manager,
    joining_date,
    salary_details,
    emergency_contact_details,
    email_token,
    clientId,
  } = req.body

  if (!name || !email) {
    // throw new BadRequestError("please provide all values")
    return res.status(400).json({
      status: false,
      message: "please provide all values",
    })
  }

  const [localPart, domainPart] = email.split("@")
  const lowercaseLocalPart = localPart.toLowerCase()
  const lowercaseEmail = `${lowercaseLocalPart}@${domainPart}`
  // const isName = validator.isAlpha(name)
  function isFullNameAlpha(fullName) {
    // Split the full name into individual words
    const words = fullName.trim().split(/\s+/)

    // Check if each word is alpha
    for (const word of words) {
      if (!validator.isAlpha(word)) {
        return false
      }
    }

    return true
  }

  const isName = isFullNameAlpha(name)
  console.log(isName)
  if (isName === false) {
    // throw new BadRequestError("please provide correct name")
    return res.status(400).json({
      status: false,
      message: "please provide correct name",
    })
  }
  const isEmail = validator.isEmail(email)
  if (isEmail === false) {
    // throw new BadRequestError("please provide correct email")
    return res.status(400).json({
      status: false,
      message: "please provide correct email",
    })
  }
  // check if user already exists
  const userAlreadyExist = await UserModel.findOne({ email: lowercaseEmail })

  if (userAlreadyExist) {
    // throw new BadRequestError("user already exist")
    return res.status(400).json({
      status: false,
      message: "user already exist",
    })
  }

  const token = jwt.sign(
    { email: lowercaseEmail, role },
    process.env.JWT_SECRET
  )

  const user = await UserModel.create({
    name,
    email: lowercaseEmail,
    contact_number,
    country,
    address,
    education_qualification,
    work_experience,
    skills,
    job_title,
    department,
    reporting_manager,
    joining_date,
    salary_details,
    emergency_contact_details,
    email_token: token,
    clientId,
    is_active: true,
  })

  // console.log(updateUser)
  //   await defaultProfile(user._id.toString())

  const subject = "Confirmation Mail"
  const buttonContent = await getButtonTemplate(
    `verify_email/${token}`,
    "verify email"
  )
  const html = await getEmailMsgTemplate(
    ` <h4 style="text-align:center;font-weight:500"> Please verify your email address is <br/>${email}</h4>
      ${buttonContent}
    `,
    name
  )
  sendMail(lowercaseEmail, subject, html)

  res.status(201).json({ status: true, message: "signup successful", user })
}
const deleteUser = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError("please provide user id")
  }
  const [localPart, domainPart] = email.split("@")
  const lowercaseLocalPart = localPart.toLowerCase()
  const lowercaseEmail = `${lowercaseLocalPart}@${domainPart}`

  const user = await UserModel.findOne({
    email: lowercaseEmail,
  })

  if (!user) {
    throw new NotFoundError("no user with this id")
  }
  const deletedUser = await UserModel.findByIdAndDelete(user._id)
  res.status(200).json({ status: true, msg: "user deleted successfully" })
}
module.exports = { signup2, deleteUser }
