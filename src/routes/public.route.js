const express = require('express')
const user = require('./../controllers/users/user.controller')
const comment = require('../controllers/comment/comment.Controller')
const router = express.Router()



/* - USER RELATED HANDELERS - */
router.post('/register', user.create)
router.post('/login', user.login)
router.get('/verify/:key', user.verifyEmail)

// comment API routers
router.post('/comment/create', comment.create)
router.put('/comment/update', comment.update)
router.delete('/comment/delete', comment.deletecomment)



module.exports = router