const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    message: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)