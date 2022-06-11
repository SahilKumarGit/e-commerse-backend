const express = require('express')
const send = require('../configs/smtp.config')
const router = express.Router()
const redis = require('./../configs/radis.config')


router.get('/hello', async (req, res) => {
    // const s = await redis.setEx('key', 60, 'value')
    // const s = await redis.set('key', 'value')
    // const s = await redis.get('key')
    // let message = await send("All Good ✅", "sahil.0202017@gmail.com", "Hello World", "It work fine")
    return res.send('s')

})





module.exports = router