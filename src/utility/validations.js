const emptyString = (val) => {
    if (!val) return true
    if (!val.trim()) return true
    return false
}

const emptyNumber = (val) => {
    if (!val) return true
    if (isNaN(val)) return true
    if (!Number(val)) return true
    return false
}

const emptyObject = (obj) => {
    for (const key in obj) {
        return false
    }
    return true
}

const invalidEmail = (email) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return !emailRegex.test(email)
}

let invalidPassword = function (password) {
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    return !passwordRegex.test(password)
}






module.exports = { emptyString, emptyNumber, emptyObject, invalidEmail, invalidPassword }