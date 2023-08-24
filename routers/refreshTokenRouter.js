const express = require("express")
const {
  logout,
  getNewAccessToken,
  verifyAccessToken,
} = require("../controllers/refreshToken")
const router = express.Router()

router.route("/").post(getNewAccessToken).delete(logout)
router.route("/verifyToken").post(verifyAccessToken)
module.exports = router
