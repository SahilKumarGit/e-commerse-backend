const wishModel = require('../../models/wishlist.Model')
const productModel = require('./../../models/product.model')
const { unSuccess, success } = require("../../utility/response");
const { emptyObject, invalidObjectId, emptyString } = require('../../utility/validations');


const createList = async (req, res) => {
    try {
        let data = req.body
        if (emptyObject(data)) return unSuccess(res, 400, true, 'Body is required!!')
        let userId = req.tokenData.userId
        let { productId } = data
        if (emptyString(productId)) return unSuccess(res, 400, true, 'ProductId required!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        let list = await wishModel.findOne({ userId: userId })
        if (list) {
            let items = list.items
            for (let i of items) {
                if (productId === i.product.toString()) {
                    return unSuccess(res, 200, true, 'product already in wishList')
                }
            }
            items.push({ product: productId })
            await list.save();
            return success(res, 201, true, "new product added to wishlist", list)
        }
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}

//=================get wishList=====================
const viewList = async (req, res) => {
    try {
        let userId = req.tokenData.userId
        let list = await wishModel.findOne({ userId: userId }).populate({ path: 'items.product' })//,select:['title','price','productImage']
        if (list.items.length == 0) {
            return unSuccess(res, 404, true, 'wishList empty')
        }
        return success(res, 201, true, "wishlist", list)
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}
//================remove wishList item===================
const removeItem = async (req, res) => {
    try {
        let data = req.body
        if (emptyObject(data)) return unSuccess(res, 400, true, 'Body is required!!')
        let userId = req.tokenData.userId
        let { productId } = data
        if (emptyString(productId)) return unSuccess(res, 400, true, 'ProductId required!')
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        let list = await wishModel.findOne({ userId: userId })
        let items = list.items
        items.forEach((e, i) => {
            if (productId == e.product.toString()) {
                items.splice(i, 1)
            }
        })
        await list.save()
        return success(res, 201, true, "wishlist", list)
    }
    catch (e) {

    }
}
module.exports = { createList, viewList, removeItem }