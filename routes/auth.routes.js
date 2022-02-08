require("dotenv").config();
const Router = require('express')
const {check} = require("express-validator")
const controller = require('../controller/auth.controller')
const auth = require("../middlewares/auth")
const router = new Router()

router.post("/signup",[
    check('email', "Email cannot be empty").notEmpty(),
    check('password', "Password should be at least 10 digit").isLength({min:4, max:10})
], controller.signup)
router.post("/signin", controller.signin)
router.post('/logout', auth, controller.logout)
router.post('/token', auth, controller.token)
router.post("/change", controller.changePassword)

router.get("/verify/:email", controller.verifyEmail)



module.exports = router