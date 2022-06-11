const express = require('express')
const router = express.Router()


router.post('/hello', (req, res) => {
    res.send('Hello World!')
})





module.exports = router