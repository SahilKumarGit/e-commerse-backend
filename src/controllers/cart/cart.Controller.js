// cart create api✅
// product add kerga aur increa kerga by 1 [product id and size need to be match then increase] else addd new✅
//decrease is also same as update
//delete is emptys entire itmes
//view cart 
const cartModel = require('../../models/cart.Model')
const productModel = require('./../../models/product.model')
const { emptyObject, emptyString, emptyNumber, invalidObjectId } = require("../../utility/validations");
const { unSuccess, success } = require("../../utility/response");



const cartUpdate = async (req, res) => {
    try {
        let data = req.body
        let { productId, size, add } = data
        let userId = req.tokenData.userId
        if (invalidObjectId(productId)) return unSuccess(res, 400, true, 'enter valid productId!')

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
            if (productId == id && size === sizeinitem && add == 1) {
                let newquant = items[i].quantity
                items[i].quantity = newquant + add;
                await cart.save()
                let result = await cartModel.findOne({ userId: userId }).populate({ path: 'items.product' })
                // let result = await cartModel.findOneAndUpdate(
                //     { "items.product": productId, "items.size": size },
                //     { $inc: { "items.quantity": 1 }},{ new: true } )
                return success(res, 200, true, "cart updated", result)
            }
        }
        cart.items.push({ product: productId, quantity: 1, size: size })
        await cart.save()
        let result = await cartModel.findOne({ userId: userId }).populate({ path: 'items.product' })
        return success(res, 201, true, "new product added to cart", result)
    }
    catch (e) {
        console.log(e)
        return unSuccess(res, 500, true, e.message)
    }
}

// remove cart items
// if (productId == id && size === sizeinitem && add == -1) {
//     if (items.length == 0) return unSuccess(res, 400, true, 'cart is empty')
//     let newquant = items[i].quantity
//     if (newquant == 1) {
//         cart.items = []
//         await cart.save()
//         return success(res, 200, true, "cart updated", cart)
//     }
//     items[i].quantity = newquant + add;
//     await cart.save()
//     let result = await cartModel.findOne({ userId: userId }).populate({ path: 'items.product' })
//     return success(res, 200, true, "cart updated", result)
// }
module.exports = { cartUpdate }



