const commentModel = require('../../models/comment.model')
const { emptyObject, emptyString, emptyNumber, invalidObjectId, isValidRequestBody } = require("../../utility/validations");
const { unSuccess, success } = require("../../utility/response");
const userModel = require('../../models/user.model');
const productModel = require('./../../models/product.model')


const create = async (req, res) => {
    try {
        let data = req.body
        let { userId, productId, message, rating } = data
        if (isValidRequestBody(data)) return unSuccess(res, 400, true, 'data cannot be empty!')
        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (emptyString(userId)) return unSuccess(res, 400, true, 'userId is required!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        if (emptyNumber(rating)) return unSuccess(res, 400, true, 'rating is required!')
        if (rating < 1 || rating > 5) return unSuccess(res, 400, true, 'rating is 1 to 5 only !')
        if (!message.match(/^[a-zA-Z0-9\s]+$/)) return unSuccess(res, 400, true, 'comment is not valid !')

        //db call verify user
        let userVerify = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!userVerify) return unSuccess(res, 404, false, 'user not found enter valid user Id!')

        // product verify
        let product= await productModel.findOne({_id:productId,isDeleted:false})
        if (!product) return unSuccess(res, 404, false, 'product not found enter valid product Id!')

        //create comment 
        let result = await commentModel.create(data)
        return success(res, 201, false, "comment created", result)
    } catch (e) {
        return unSuccess(res, 500, false, e.message)
    }
}

// update comment API
const update = async (req, res) => {
    try {
        let data = req.body
        let { userId, message, rating } = data
        if (isValidRequestBody(data)) return unSuccess(res, 400, true, 'data cannot be empty!')
        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (emptyString(userId)) return unSuccess(res, 400, true, 'userId is required!')
        if (rating < 1 || rating > 5) return unSuccess(res, 400, true, 'rating is 1 to 5 only !')
        if (!message.match(/^[a-zA-Z0-9\s]+$/)) return unSuccess(res, 400, true, 'comment is not valid !')

        // db calls 
        let userVerify = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!userVerify) return unSuccess(res, 404, true, 'user not found enter valid user Id!')
        // comment verify
        let comment = await commentModel.findOne({ userId: userId, isDeleted: false })
        if (!comment) return unSuccess(res, 404, true, 'comment not found')
        if (comment.userId.toString() !== userId) return unSuccess(res, 403, true, 'unauthorised!')
        if (rating) {
            comment.rating = rating;
        }
        if (message) {
            comment.message = message;
        }
        await comment.save()
        return success(res, 200, true, "comment update", comment)

    } catch (e) {
        return unSuccess(res, 500, false, e.message)

    }
}

// delete comment 

const deletecomment = async (req, res) => {
    try {
        let data = req.body
        let { userId } = data
        if (invalidObjectId(userId)) return unSuccess(res, 400, true, 'enter valid userId!')
        if (emptyString(userId)) return unSuccess(res, 400, true, 'userId is required!')
        // db calls 
        let userVerify = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!userVerify) return unSuccess(res, 404, false, 'user not found enter valid user Id!')
        // comment verify
        let comment = await commentModel.findOne({ userId: userId, isDeleted: false })
        if (!comment) return unSuccess(res, 404, true, 'comment not found')
        if (comment.userId.toString() !== userId) return unSuccess(res, 403, true, 'unauthorised!')
        comment.isDeleted = true
        await comment.save();
        return success(res, 200, true, "comment deleted", comment)
    } catch (e) {
        return unSuccess(res, 500, false, e.message)
    }
}

module.exports = {
    create,
    update,
    deletecomment
}