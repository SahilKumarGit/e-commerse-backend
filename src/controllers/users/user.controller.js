const { unSuccess, success } = require("../../utility/response");
const usersModel = require('../../models/user.model')
const { emptyObject, emptyString, emptyNumber, invalidEmail, invalidPassword, invalidPincode, invalidPhone, invalidObjectId } = require("../../utility/validations");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const short = require('short-uuid');
const client = require("../../configs/radis.config");
const sendMail = require("../../configs/smtp.config");
const { secretkey } = require("../../environment/config.env");
const userModel = require("../../models/user.model");


const saltRounds = 10;


// ⬇️ REGISTER -------------------------------------------
const create = async (req, res) => {
    try {
        // get data
        const data = req.body;

        if (emptyObject(data)) return unSuccess(res, 400, false, 'Post body is required!')

        let { firstName, lastName, email, phone, password, address, gender } = data

        // basic validation
        if (emptyString(firstName)) return unSuccess(res, 400, false, 'FirstName is required!')
        if (emptyString(lastName)) return unSuccess(res, 400, false, 'LastName is required!')
        if (emptyString(email)) return unSuccess(res, 400, false, 'Email address is required!')
        if (emptyString(phone)) return unSuccess(res, 400, false, 'Phone number is required!')
        if (emptyString(password)) return unSuccess(res, 400, false, 'Password is required!')
        if (emptyString(gender)) return unSuccess(res, 400, false, 'Select gender!')
        if (!["male", "female"].includes(gender)) return unSuccess(res, 400, false, 'Select gender only accept \'male\' or \'frmalr\'!')

        // regex validation
        if (invalidEmail(email)) return unSuccess(res, 400, false, 'Invalid email address!')
        if (invalidPhone(phone)) return unSuccess(res, 400, false, 'Invalid phone number!')
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
        if (invalidPincode(billing.pincode)) return unSuccess(res, 400, false, 'In billing, pincode is invalid!')

        // validation of - shipping address
        if (emptyObject(shipping)) return unSuccess(res, 400, false, 'Shipping address is required!')
        if (emptyString(shipping.address)) return unSuccess(res, 400, false, 'In shipping, address is required!')
        if (emptyString(shipping.city)) return unSuccess(res, 400, false, 'In shipping, city is required!')
        if (emptyString(shipping.state)) return unSuccess(res, 400, false, 'In shipping, state is required!')
        if (emptyNumber(shipping.pincode)) return unSuccess(res, 400, false, 'In shipping, pincode is required!')
        if (invalidPincode(shipping.pincode)) return unSuccess(res, 400, false, 'In shipping, pincode is invalid!')

        // db call for validation
        // it check both email and phone number are exist or not
        let users = await usersModel.find({ $or: [{ phone: phone }, { email: email }] })
        for (let each of users) {
            if (each.email == email) return unSuccess(res, 400, false, 'Email address is already exist!')
            if (each.phone == phone) return unSuccess(res, 400, false, 'Phone number is already exist!')
        }

        // password hashing
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const object = { firstName, lastName, email, phone, password: encryptedPassword, address, gender }
        let create = await usersModel.create(object)

        res.status(200).send({ status: true, login: !true, message: 'Account create successfully', data: create })
    } catch (e) {
        return unSuccess(res, 500, false, e.message)
    }
}


// ⬇️ LOGIN -------------------------------------------
const login = async (req, res) => {
    try {
        // get data
        const data = req.body;

        if (emptyObject(data)) return unSuccess(res, 400, false, 'Post body is required!')

        let { email, password } = data

        // basic validation
        if (emptyString(email)) return unSuccess(res, 400, false, 'Email address is required!')
        if (emptyString(password)) return unSuccess(res, 400, false, 'Password is required!')

        // regex validation
        if (invalidEmail(email)) return unSuccess(res, 400, false, 'Invalid email address!')
        if (invalidPassword(password)) return unSuccess(res, 400, false, 'Invalid password (please note that password only accept a-z,A-Z,0-1 and !@#$%^&*)!')

        // db call for validation
        // it check both email and phone number are exist or not
        let user = await usersModel.findOne({ email, isDeleted: false })
        if (!user) return unSuccess(res, 404, false, 'User\'s email does\'t exist!')

        // password compaired 
        const verify = await bcrypt.compare(password, user.password).catch(_ => {
            console.log(_.message)
            return false
        });
        if (!verify) return unSuccess(res, 401, false, 'Wrong email address or password!')

        // check email verified or not?
        if (!user.emailVerified) {

            // generate key for vfy and store it in redis
            let emailVfyId = 'vfy-' + short.generate() + '-' + new Date().getTime();
            await client.setEx(emailVfyId, 600, user._id.toString());  // 600 sec or 10 min

            // generate url for verify email http://localhost:3000/public/verify/vfy-sdfg-ds34
            let vfyUrl = `${req.protocol}://${req.headers.host}/public/verify/${emailVfyId}`
            let html = `
                <p>Hello ${user.firstName},</p>
                <p>Before login you need to verify your email first, Please click the button to verify your account (Link is valid for 10 minuts).</p>
                <a href="${vfyUrl}" target="_blank">Verify Email Address</a>
            `;

            // send email here
            await sendMail("Email Verification - No Reply", user.email, "Email Verification", html);

            return unSuccess(res, 403, false, "Email not verified, We send you an email to verify your account!")
        }


        // generate token here
        const token = jwt.sign({
            userId: user._id
        }, secretkey, {
            expiresIn: '24h'
        });

        return success(res, 200, true, { token }, "Successfully Logged-In!")

    } catch (e) {
        return unSuccess(res, 500, false, e.message)
    }
}



// ⬇️ VERIFY EMAIL -------------------------------------------
const verifyEmail = async (req, res) => {
    try {
        // get data params 
        const key = req.params.key;

        const template = `
            <!DOCTYPE html>
            <html style="height:100%">
            <head>
                <title>🔒 Verification!</title>
                <style>
                *{
                    font-family: Arial, Helvetica, sans-serif;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                </style>
            </head>
            <body style=" height: 100%; display: flex; justify-content: center; align-items: center;">
                <h1 class="title">{{message}}</h1>
            </body>
            </html>
        `;

        // check key using radis
        const value = await client.get(key)
        if (!value) return res.send(template.replace('{{message}}', "☹️ Invalid Link / Time Out!"))

        // if value avalable
        if (invalidObjectId(value)) return res.send(template.replace('{{message}}', "☹️ Bad Key!"))

        //update user document
        await userModel.findByIdAndUpdate(value, { emailVerified: true })

        return res.send(template.replace('{{message}}', "🎉 Email address Verified!"))

    } catch (e) {
        return unSuccess(res, 500, false, e.message)
    }
}




module.exports = { create, login, verifyEmail }