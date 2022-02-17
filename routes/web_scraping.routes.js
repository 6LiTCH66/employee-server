require("dotenv").config()
const Router = require("express")
const auth = require("../middlewares/auth")
const controller = require("../controller/web_scraping.controller")
const router = new Router()

router.post('/vastused', controller.createVastused)
router.get("/vastused", controller.getVastused)
module.exports = router