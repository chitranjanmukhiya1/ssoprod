const jwt = require("jsonwebtoken")
const UserToken = require("../schema/UserToken")

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.role }

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: 840000 }
    )
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "10d" }
    )
    const userToken = await UserToken.findOne({ userId: user._id })
    if (userToken) await UserToken.findOneAndRemove({ userId: user._id })

    await new UserToken({ userId: user._id, token: refreshToken }).save()
    return Promise.resolve({ accessToken, refreshToken })
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = generateTokens
