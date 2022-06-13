const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    images: {
        type: [String],
        required: true,
        trim: true
    },
    admin: {
        type: objectId,
        required: true,
        ref: "admin"
    },
    brandName: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    filter: {
        type: String,
        required: true,
        trim: true,
        enum: ["men", "women", "boys", "girls"]
    },
    price: {
        mrp: {
            type: Number,
            required: true,
            default: 0
        },
        discount: {
            type: Number,
            required: true,
            default: 0
        },
        total: {
            type: Number,
            required: true,
            default: 0
        },
        includeTax: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    availableStock: {
        type: Number,
        required: true,
        default: 0
    },
    size: {
        type: [String],
        required: true,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    },
    highlights: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    sortDescription: {
        type: String,
        required: true,
        trim: true
    },
    size_fit: {
        type: String,
        required: true,
        trim: true
    },
    material_care: {
        type: String,
        required: true,
        trim: true
    },
    specification: [{
        title: {
            type: String,
            trim: true,
            required: true
        },
        value: {
            type: String,
            trim: true,
            required: true
        }
    }],
    rating: {
        average: {
            type: Number,
            required: true,
            default: 0
        },
        totalUsers: {
            type: Number,
            required: true,
            default: 0
        },
        rating: {
            oneStar: {
                type: Number,
                required: true,
                default: 0
            },
            twoStar: {
                type: Number,
                required: true,
                default: 0
            },
            threeStar: {
                type: Number,
                required: true,
                default: 0
            },
            fourStar: {
                type: Number,
                required: true,
                default: 0
            },
            fiveStar: {
                type: Number,
                required: true,
                default: 0
            },
        }
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);
