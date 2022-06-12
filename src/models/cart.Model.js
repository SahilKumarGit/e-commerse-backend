const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'user',
        unique: true
    },
    items: [{
        product: {
            type: ObjectId,
            ref: 'product'
        }
    }, {
        quantity: {
            type: Number,
            required: true,
            trim: true,
            min: 1
        },
        _id: false
    }],
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
    },         
    totalItems: {
        type: Number,
        required: true,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)