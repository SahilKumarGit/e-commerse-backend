const mongoose = require('mongoose')

const adminSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:{
        type:String,
        minlength:8,
        maxlength:15
    },
    role: {
        product: {
            create:{
                type:Boolean,
                default:false
            },
            update: {
                type:Boolean,
                default:false
            },
            Delete:  {
                type:Boolean,
                default:false
            },
        },
        user: {
            create: {
                type:Boolean,
                default:false
            },
            update: {
                type:Boolean,
                default:false
            },
            Delete: {
                type:Boolean,
                default:false
            },
        },
        wishList: {
            create: {
                type:Boolean,
                default:false
            },
            update: {
                type:Boolean,
                default:false
            },
            Delete: {
                type:Boolean,
                default:false
            },
        },
        comment: {
            create: {
                type:Boolean,
                default:false
            },
            update: {
                type:Boolean,
                default:false
            },
            Delete: {
                type:Boolean,
                default:false
            },
        },
        cart: {
            create: {
                type:Boolean,
                default:false
            },
            update:  {
                type:Boolean,
                default:false
            },
            Delete: {
                type:Boolean,
                default:false
            },
        },
        order: {
            create: {
                type:Boolean,
                default:false
            },
            update: {
                type:Boolean,
                default:false
            },
            Delete: {
                type:Boolean,
                default:false
            },
        }
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
},{timestamps:true})

module.exports=mongoose.model('admin',adminSchema)