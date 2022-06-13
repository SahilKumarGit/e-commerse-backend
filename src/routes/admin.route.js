const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin/admin.Controller')
const { uploadImage } = require('../controllers/upload/images.controller')
const createProduct = require('./../controllers/product/product.controller')
const { authentication, authrization } = require('./../middleware/admin/auth.middleware')

router.post('/uploadImage', uploadImage)
router.post('/register', adminController.create)
router.post('/login', adminController.login)

// product
router.post('/product/create', authentication, authrization, createProduct)





module.exports = router