const router = require("express").Router()
const {
  send_otp,
  verify_otp,
  verify_email,
} = require("../controllers/signinController")

router.post("/send_otp", send_otp)
router.post("/verify_otp", verify_otp)
router.post("/verify_email", verify_email)

module.exports = router
