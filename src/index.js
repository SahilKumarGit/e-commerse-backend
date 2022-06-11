const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const public_route = require('./routes/public.route')
const admin_route = require('./routes/admin.route')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer().any())

app.use('/public/', public_route)
app.use('/admin/', admin_route)

app.listen(port, () => {
    console.log(`🎉 E-commerce app listening on port ${port}`)
})