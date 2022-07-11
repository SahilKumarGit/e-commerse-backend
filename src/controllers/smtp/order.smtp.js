const send = require("../../configs/smtp.config")

module.exports.orderPlaced = async function (user, orderid, price) {
    let html = `
        <p>Hello ${user.firstName},</p>
        <p>Your order placed successfully.</p>
        <p>Order id ${orderid}.</p>
        <p>Total Price ₹${price}.</p>
        
    `;
    return await send("Order Placed - No Reply", user.email, "Order Placed", html);
}




