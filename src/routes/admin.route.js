const express = require('express')
const send = require('../configs/smtp.config')
const router = express.Router()
const redis = require('./../configs/radis.config')
const adminController=require('../controllers/admin/admin.Controller')

router.get('/hello', async (req, res) => {
    // const s = await redis.setEx('key', 60, 'value')
    // const s = await redis.set('key', 'value')
    // const s = await redis.get('key')
    let s = await send("All Good ✅", "saurabhmanohar90@gmail.com", "Hello World", "It work fine")
    return res.send(s)

})
router.post('/adminCreate',adminController.create)
router.post('/adminLogin',adminController.login)





module.exports = router