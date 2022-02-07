const Router = require('express')
const controller = require('../controller/employee.controller')
const UserController = require('../controller/user_auth.controller')

const router = new Router()

router.post('/employee', controller.createEmployee)
router.get('/employee', controller.getEmployees)
router.put('/employee/:employeeId', controller.updateEmployee)
router.delete('/employee/:employeeId', controller.deleteEmployee)
router.get('/user', UserController.getAuthUsers)


module.exports = router;
