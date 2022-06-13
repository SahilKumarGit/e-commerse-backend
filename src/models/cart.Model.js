const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            trim: true,
            default: 0
        },
        size: {
            type: String,
            trim: true,
            enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)