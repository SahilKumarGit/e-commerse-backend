const { unSuccess } = require("../../utility/response");
const { emptyObject, emptyString, emptyNumber, invalidEmail, invalidPassword } = require("../../utility/validations");

const create = async (req, res) => {
    // get data
    const data = req.body;

    if (emptyObject(data)) return unSuccess(res, 400, false, 'Post body is required!')

    let { firstName, lastName, email, phone, password, address, gender } = data

    // basic validation
    if (emptyString(firstName)) return unSuccess(res, 400, false, 'FirstName is required!')
    if (emptyString(lastName)) return unSuccess(res, 400, false, 'LastName is required!')
    if (emptyString(email)) return unSuccess(res, 400, false, 'Email address is required!')
    if (emptyString(phone)) return unSuccess(res, 400, false, 'Phone number is required!')
    if (emptyString(gender)) return unSuccess(res, 400, false, 'Select gender!')
    if (!["male", "female"].includes(gender)) return unSuccess(res, 400, false, 'Select gender only accept \'male\' or \'frmalr\'!')

    // regex validation
    if (invalidEmail(email)) return unSuccess(res, 400, false, 'Invalid email address!')
    if (invalidPassword(password)) return unSuccess(res, 400, false, 'Invalid password (please note that password only accept a-z,A-Z,0-1 and !@#$%^&*)!')

    // basic validation of address
    if (emptyObject(address)) return unSuccess(res, 400, false, 'Address body is required!')

    // destructure address
    let { billing, shipping } = address

    // validation of - billing address
    if (emptyObject(billing)) return unSuccess(res, 400, false, 'Billing address is required!')
    if (emptyString(billing.address)) return unSuccess(res, 400, false, 'In billing, address is required!')
    if (emptyString(billing.city)) return unSuccess(res, 400, false, 'In billing, city is required!')
    if (emptyString(billing.state)) return unSuccess(res, 400, false, 'In billing, state is required!')
    if (emptyNumber(billing.pincode)) return unSuccess(res, 400, false, 'In billing, pincode is required!')


    // validation of - shipping address
    if (emptyObject(shipping)) return unSuccess(res, 400, false, 'Shipping address is required!')
    if (emptyString(shipping.address)) return unSuccess(res, 400, false, 'In shipping, address is required!')
    if (emptyString(shipping.city)) return unSuccess(res, 400, false, 'In shipping, city is required!')
    if (emptyString(shipping.state)) return unSuccess(res, 400, false, 'In shipping, state is required!')
    if (emptyNumber(shipping.pincode)) return unSuccess(res, 400, false, 'In shipping, pincode is required!')



    res.status(200).send({ status: true, login: !true, message: 'Account create successfully', data: data })
}







module.exports = { create }