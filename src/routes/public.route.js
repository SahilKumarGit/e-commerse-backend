const express = require('express')
const user = require('./../controllers/users/user.controller')
const comment = require('../controllers/comment/comment.Controller')
const { authentication, authrization } = require('../middleware/public/auth.middleware')
const router = express.Router()



/* - USER RELATED HANDELERS - */
router.post('/user/register',user.create)
router.post('/user/login', user.login)
router.get('/verify/:key', user.verifyEmail)

// comment API routers
router.post('/comment/create',authentication,authrization, comment.create)
router.put('/comment/update', authentication,authrization,comment.update)
router.delete('/comment/delete',authentication,authrization,comment.deletecomment)



module.exports = router