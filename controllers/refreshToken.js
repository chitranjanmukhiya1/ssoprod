const verifyRefreshToken = require("../utils/verifyRefreshToken")
const UserToken = require("../schema/UserToken")
const jwt = require("jsonwebtoken")
const { UnAuthenticatedError } = require("../errors")
// get new access token
const getNewAccessToken = async (req, res) => {
  const verify = verifyRefreshToken(req.body.refreshToken)

  if (verify) {
    const payload = { _id: verify._id, role: verify.roles }
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: 840000 }
    )
    res.status(200).json({
      accessToken,
      message: "access token created successfully",
    })
  } else {
    res.status(401).json({ message: "refresh token invalid" })
  }
}

// logout
const logout = async (req, res) => {
  try {
    const userToken = await UserToken.findOne({ token: req.body.refreshToken })
    if (!userToken) {
      return res
        .status(200)
        .json({ error: false, message: "logged out successfully" })
    }
    await UserToken.findOneAndRemove({ token: req.body.refreshToken })
    res.status(200).json({ error: false, message: "logged out successfully" })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: true, message: "internal server error" })
  }
}
const verifyAccessToken = async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("authentication invalid")
  }
  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY)
    // req.user = { userId: payload.userId }
    // next()

    res.status(200).json({ msg: "token valid", user: payload._id })
  } catch (error) {
    throw new UnAuthenticatedError("authentication invalid")
  }
}
module.exports = { logout, getNewAccessToken, verifyAccessToken }
