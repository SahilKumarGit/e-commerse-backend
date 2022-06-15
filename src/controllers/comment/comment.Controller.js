const commentModel = require('../../models/comment.model')
const { emptyObject, emptyString, emptyNumber, invalidObjectId, isValidRequestBody } = require("../../utility/validations");
const { unSuccess, success } = require("../../utility/response");
const productModel = require('./../../models/product.model');


const create = async (req, res) => {
    try {
        let data = req.body
        let Id = req.tokenData.userId
        data.userId = Id
        let { userId, productId, message, rating } = data

        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (emptyString(userId)) return unSuccess(res, 400, true, 'userId is required!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        if (emptyNumber(rating)) return unSuccess(res, 400, true, 'rating is required!')
        if (![1, 2, 3, 4, 5].includes(rating)) return unSuccess(res, 400, true, 'rating is 1 to 5 numbers only !')
        if (emptyString(message)) return unSuccess(res, 400, true, 'comment is required!')
        if (!message.match(/^[a-zA-Z0-9\s]+$/)) return unSuccess(res, 400, true, 'comment is not valid!')

        // product verify
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return unSuccess(res, 404, true, 'product not found enter valid product Id!')

        let comment = await commentModel.findOne({ userId: userId, isDeleted: false })
        if (comment) return unSuccess(res, 400, true, 'comment already exists!')

        //create comment 
        let result = await commentModel.create(data)
        return success(res, 201, true, "comment created", result)
        
    } catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}

// update comment API
const update = async (req, res) => {
    try {
        let data = req.body
        let Id = req.tokenData.userId
        data.userId = Id
        let { userId, message, rating, productId } = data
        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        if (emptyString(userId)) return unSuccess(res, 400, true, 'userId is required!')
        if (rating < 1 || rating > 5) return unSuccess(res, 400, true, 'rating is 1 to 5 only !')
        if (message) {
            if (emptyString(message)) return unSuccess(res, 400, true, 'message cannot be empty!')
            if (!message.match(/^[a-zA-Z0-9\s]+$/)) return unSuccess(res, 400, true, 'comment is not valid !')
        }
        //db calls
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return unSuccess(res, 404, true, 'product not found')
        // comment verify
        let obj = {}

        if (rating) {
            obj.rating = rating;
        }
        if (message) {
            obj.message = message;
        }

        let comment = await commentModel.findOneAndUpdate(
            { userId: userId, isDeleted: false, productId: productId }, obj, { new: true })
        if (!comment) return unSuccess(res, 404, true, 'comment not found')
        return success(res, 200, true, "comment update", comment)

    } catch (e) {
        return unSuccess(res, 500, true, e.message)

    }
}

// delete comment 

const deletecomment = async (req, res) => {
    try {
        let data = req.body
        let Id = req.tokenData.userId
        data.userId = Id
        let { userId, productId } = data
        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        // db calls 
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return unSuccess(res, 404, true, 'product not found')
        // comment verify
        let comment = await commentModel.findOne({ userId: userId, isDeleted: false })
        if (!comment) return unSuccess(res, 404, true, 'comment not found')
        if (comment.userId.toString() !== userId) return unSuccess(res, 403, true, 'unauthorised!')
        comment.isDeleted = true
        comment.deletedAt = new Date()

        await comment.save();
        return success(res, 200, true, "comment deleted")
    } catch (e) {
        return unSuccess(res, 500, true, e.message)
    }
}

module.exports = {
    create,
    update,
    deletecomment
}