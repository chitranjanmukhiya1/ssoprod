const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const users = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  country: {
    type: String,
    default: "US",
  },
  //   role: {
  //     type: String,
  //     required: true,
  //     default: "developer",
  //   },
  // assignedRoles: [String],

  //   assignedRoles: {
  //     type: [String],
  //     default: [],
  //   },

  email_token: {
    type: String,
  },
  is_active: {
    type: Boolean,
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

users.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

module.exports = mongoose.model("users", users)
