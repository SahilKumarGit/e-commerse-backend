const success = (res, code, login, data, message) => {
    return res.status(code).send({ status: true, login, message, data })
}

const unSuccess = (res, code, login, message) => {
    return res.status(code).send({ status: false, login, message })
}

module.exports = { unSuccess, success }