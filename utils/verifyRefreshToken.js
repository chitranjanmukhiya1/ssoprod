const UserToken = require("../schema/UserToken")
const jwt = require("jsonwebtoken")

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY

  // console.log("verify refresh token", refreshToken)

  const userToken = UserToken.findOne({ token: refreshToken })
  if (userToken) {
    const valid = jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      // console.log("tokenDetails", tokenDetails)

      if (err) {
        // console.log("token expired error in verify ", err)
        return false
      } else {
        return tokenDetails
      }
    })
    return valid
  }
}

module.exports = verifyRefreshToken
