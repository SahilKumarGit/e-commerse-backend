const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const public_route = require('./routes/public.route')
const admin_route = require('./routes/admin.route')
const { mongoDB } = require('./environment/config.env')
const mongoose = require('mongoose')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer().any())


// Mongoose - MongoDB - Connect
mongoose.connect(mongoDB, { useNewUrlParser: true, })
    .then((_) => console.log("✅ MongoDb is Connected"))
    .catch((e) => console.log('⚠️', e.message));


// router base semi global medelware
app.use('/public/', public_route)
app.use('/admin/', admin_route)


// for bad url call 404
app.all('/**', (req, res) => {
    res.status(404).send({ status: false, message: "Page Not Found!" })
})


app.listen(port, () => {
    console.log(`✅ E-commerce app listening on port ${port}`)
})