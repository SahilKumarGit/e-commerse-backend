const express = require('express')
const user = require('./../controllers/users/user.controller')
const product = require('./../controllers/product/product.controller')
const comment = require('../controllers/comment/comment.Controller')
const cart = require('../controllers/cart/cart.Controller')
const { authentication, authrization } = require('../middleware/public/auth.middleware')
const router = express.Router()



/* - USER RELATED HANDELERS - */
router.post('/user/register',user.create)
router.post('/user/login', user.login)
router.get('/user/profile',authentication,authrization, user.getUser)
router.get('/user/address',authentication,authrization, user.address)
router.put('/user/profile',authentication,authrization, user.updateUser)
router.put('/user/address',authentication,authrization, user.updateAddress)

// email verify
router.get('/verify/:key', user.verifyEmail)

// comment API routers
router.post('/comment/create',authentication,authrization, comment.create)
router.put('/comment/update', authentication,authrization,comment.update)
router.delete('/comment/delete',authentication,authrization,comment.deletecomment)

// product API routers
router.get('/product/:productId', product.viewOne)

//cart api
router.put('/cart/Addtocart',authentication,authrization,cart.cartUpdate)
router.put('/cart/removeFromcart',authentication,authrization,cart.removeItemincart)
router.get('/cart/Mycart',authentication,authrization,cart.viewCart)
router.delete('/cart/deleteMycart',authentication,authrization,cart.deleteCart)





module.exports = router