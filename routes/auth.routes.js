const Router = require('express')
const controller = require('../controller/auth.controller')
const auth = require("../middlewares/auth")
const router = new Router()

router.post("/signup", controller.signup)
router.post("/signin", controller.signin)
router.get('/logout',auth, controller.logout)



module.exports = router