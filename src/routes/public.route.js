const express = require('express')
const user = require('./../controllers/user.controller')

const router = express.Router()




router.post('/register', user.create)





module.exports = router