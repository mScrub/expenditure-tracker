const SERVER_RTN_MSG_USER = {
    missingInputFieldsOnCreation: "Username, email, and password are needed",
    missingInputFieldsOnAuth: "Username and password are needed",
    duplicateUsername : "Duplicate username",
}

const TOKEN_EXPIRATION = {
    expiresIn30s: '30s',
    epxiresIn1d: '1d',
}

const ERROR_CODE_MSG = {
    401 : 'Unauthorized',
    403 : 'Forbidden'
}

module.exports = {
    SERVER_RTN_MSG_USER,
    TOKEN_EXPIRATION,
    ERROR_CODE_MSG
}