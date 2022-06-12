const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required:true,
        unique: true
    },
    // productId: {
    //     type: ObjectId,
    //     ref:'Product',
    //     unique:true
    // },
    message: String,
    rating: {
        type: Number,
        required:true,
        min: 1,
        max: 5
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)