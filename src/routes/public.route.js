const express = require('express')
const user = require('./../controllers/users/user.controller')
const product = require('./../controllers/product/product.controller')
const comment = require('../controllers/comment/comment.Controller')
const cart = require('../controllers/cart/cart.Controller')
const wishList = require('../controllers/wishList/wishList.Controller')
const orderByCod=require('../controllers/order/cod/order.Cod.Controller')
const orders=require('../controllers/order/orderList.controller')
const { authentication, authrization } = require('../middleware/public/auth.middleware')
const { createPaymentEnv } = require('../controllers/order/using_paytm/initializePayment.controller')
const router = express.Router()



/* - USER RELATED HANDELERS - */
router.post('/user/register', user.create)
router.post('/user/login', user.login)
router.get('/user/profile', authentication, authrization, user.getUser)
router.get('/user/address', authentication, authrization, user.address)
router.put('/user/profile', authentication, authrization, user.updateUser)
router.put('/user/address', authentication, authrization, user.updateAddress)
router.put('/user/changepassword', authentication, authrization, user.changepassword)
router.post('/user/forgetpassword', user.forgetPassword)
router.post('/user/resetpassword', user.resetPassword)

// email verify
router.get('/verify/:key', user.verifyEmail)

// comment API routers
router.post('/comment/create', authentication, authrization, comment.create)
router.get('/comment/:productId', comment.view)
router.put('/comment/update', authentication, authrization, comment.update)
router.delete('/comment/delete', authentication, authrization, comment.deletecomment)

// product API routers
router.get('/product/:productId', product.viewOne)
router.get('/product', product.viewAll)

//cart api
router.put('/cart/addToCart', authentication, authrization, cart.addToCart)
router.put('/cart/updateCart', authentication, authrization, cart.cartUpdate)
router.put('/cart/removeFromcart', authentication, authrization, cart.removeItemincart)
router.get('/cart/myCart', authentication, authrization, cart.viewCart)
router.delete('/cart/deleteMyCart', authentication, authrization, cart.deleteCart)

//wishList api
router.post('/wishList/AddtowishList', authentication, authrization, wishList.createList)
router.get('/wishList/ViewwishList', authentication, authrization, wishList.viewList)
router.delete('/wishList/removeitemwishList', authentication, authrization, wishList.removeItem)

//order api to show all orders
router.get('/order', authentication, authrization, orders.orderList)

//order apis cod
router.post('/order/byCod', authentication, authrization, orderByCod.orderCod)

// order apy paytm
router.post('/paytm/init', authentication, authrization, createPaymentEnv)





module.exports = router