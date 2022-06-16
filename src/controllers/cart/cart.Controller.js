// cart create api✅
// product add kerga aur increa kerga by 1 [product id and size need to be match then increase] else addd new✅
//decrease is also same as update
//delete is emptys entire itmes
//view cart 
const cartModel = require('../../models/cart.Model')
const productModel = require('./../../models/product.model')
const { invalidObjectId } = require("../../utility/validations");
const { unSuccess, success } = require("../../utility/response");


// update cart🛒🛒
const cartUpdate = async (req, res) => {
    try {
        let data = req.body
        let { productId, size } = data
        let userId = req.tokenData.userId
        size = size.toUpperCase()
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        if (!["XS", "S", "M", "L", "XL", "XXL"].includes(size)) return unSuccess(res, 400, true, 'enter valid size')
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product)
            return unSuccess(res, 404, true, 'product not found enter valid product Id!')
        let cart = await cartModel.findOne({ userId: userId })
        if (!cart)
            return unSuccess(res, 404, true, 'cart not found enter valid cart Id!')
        let items = cart.items
        for (let i = 0; i < items.length; i++) {
            let id = items[i].product
            let sizeinitem = items[i].size
            if (productId == id && size === sizeinitem) {
                let newquant = items[i].quantity
                items[i].quantity = newquant + 1;
                await cart.save()
                //let result = await cartModel.findOne({ userId: userId }).populate({""})
                // let result = await cartModel.findOneAndUpdate(
                //     { "items.product": productId, "items.size": size },
                //     { $inc: { "items.quantity": 1 }},{ new: true } )
                return success(res, 200, true, "cart updated", cart)
            }
        }
        cart.items.push({ product: productId, quantity: 1, size: size })
        await cart.save()
        //let result = await cartModel.findOne({ userId: userId })
        return success(res, 201, true, "new product added to cart", cart)
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}

//remove cart items🛒♻
const removeItemincart = async (req, res) => {
    try {
        let data = req.body
        let { productId, size } = data
        let userId = req.tokenData.userId
        size = size.toUpperCase()
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')
        if (!["XS", "S", "M", "L", "XL", "XXL"].includes(size))
            return unSuccess(res, 400, true, 'enter valid size')

        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product)
            return unSuccess(res, 404, true, 'product not found enter valid product Id!')
        let cart = await cartModel.findOne({ userId: userId })
        if (!cart)
            return unSuccess(res, 404, true, 'cart not found enter valid cart Id!')
        let items = cart.items
        if (items.length == 0) return unSuccess(res, 400, true, 'cart is empty')
        for (let i = 0; i < items.length; i++) {
            let id = items[i].product
            let sizeinitem = items[i].size
            if (productId == id && size === sizeinitem) {
                let newquant = items[i].quantity
                if (newquant == 1) {
                    cart.items.splice(i, 1)
                    await cart.save()
                    return success(res, 200, true, "cart updated", cart)
                }
                items[i].quantity = newquant - 1;
                await cart.save()
                //let result = await cartModel.findOne({ userId: userId })
                return success(res, 200, true, "cart updated", cart)
            }
        }
        return unSuccess(res, 404, true, 'product not in cart')
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}

//view cart 🛒👀
const viewCart = async (req, res) => {
    try {
        let userId = req.tokenData.userId
        let cart = await cartModel.findOne({ userId: userId })
        if (!cart)
            return unSuccess(res, 404, true, 'cart not found enter valid cart Id!')
        return success(res, 200, true, "cart updated", cart)
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}
// delete cart🛒❌
const deleteCart = async (req, res) => {
    try {
        let userId = req.tokenData.userId
        let cart = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { items: [] } }, { new: true })
        if (!cart)
            return unSuccess(res, 404, true, 'cart not found enter valid cart Id!')
        // cart.items = []
        // await cart.save()
        return success(res, 200, true, "cart deleted", cart)
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}
module.exports = { cartUpdate, removeItemincart, viewCart, deleteCart }



