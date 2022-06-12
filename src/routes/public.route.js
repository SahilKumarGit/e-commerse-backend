const express = require('express')
const user = require('./../controllers/users/user.controller')

const router = express.Router()



/* - USER RELATED HANDELERS - */ 
router.post('/register', user.create)
router.post('/login', user.login)
router.get('/verify/:key', user.verifyEmail)




module.exports = router