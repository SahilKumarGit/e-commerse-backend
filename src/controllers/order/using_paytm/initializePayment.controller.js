/**
 * Whenever the user trying to checkout.
 * This API first execute.
 * For generating token.
 * Store temporary order ID For 15 minute. */

const cartModel = require("../../../models/cart.Model")
const { success, unSuccess } = require("../../../utility/response")

const createPaymentEnv = async function (req, res) {
    /**
     * First, we need to get details of the cart.
     * Because the user details already exist in req .
     * So I just collect them and call the cart here.
     */
    const user = req.user
    const cart = await cartModel.findOne({ userId: user._id }).populate("items.product", { 'price': 1, 'size_and_inventory': 1 })
    if (!cart)
        return unSuccess(res, 404, true, 'cart not found')
    // console.log(cart)

    success(res, 200, true, "All ok", {cart})
}


module.exports = { createPaymentEnv }