const { mongoose } = require("mongoose")

const userOtp = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    default: false,
  },
  is_used: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: String,
    default: new Date().toISOString(),
  },
  updated_on: {
    type: String,
    default: new Date().toISOString(),
  },
})

const OtpModel = mongoose.model("UserOtp", userOtp)

module.exports = OtpModel
