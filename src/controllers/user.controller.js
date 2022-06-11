const { unSuccess } = require("../utility/response");
const { emptyObject, emptyString } = require("../utility/validations");

const create = async (req, res) => {
    // get data
    const data = req.body;

    if (emptyObject(data)) unSuccess(res, 400, false, 'Post body is required!')

    let { firstName, lastName, email, phone, password, address, gender } = data

    // basic validation
    if(emptyString(firstName)) unSuccess(res, 400, false, 'FirstName is required!')
    if(emptyString(lastName)) unSuccess(res, 400, false, 'LastName is required!')
    if(emptyString(email)) unSuccess(res, 400, false, 'Email address is required!')
    if(emptyString(phone)) unSuccess(res, 400, false, 'Phone number is required!')
    res.status(200).send({ status: true, login: !true, message: 'Account create successfully', data: data })
}







module.exports = { create }