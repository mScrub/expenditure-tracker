const SERVER_RTN_MSG_USER = {
    missingInputFieldsOnCreation: "Username, email, and password are needed",
    missingInputFieldsOnAuth: "Username and password are needed",
    duplicateUsername : "Duplicate username",
    nonExistentUser: "User not found",
    successfulLogin: "Successful Login"
}

const ERROR_CODE_MSG = {
    401 : "Unauthorized",
    403 : "Forbidden"
}

const COOKIE_MSG = {
    clearedCookie: "Cookie is cleared",
    204: "No content"
}

const SERVER_RTN_MSG_EXPENSE = { 
    failedDetailRetrieval :"Failed to retrieve expense post detail",
}

const DB_RTN_MSG = {
    noSuchExpDetailPost : 'Found no such post detail'
}

module.exports = {
    SERVER_RTN_MSG_USER,
    TOKEN_EXPIRATION,
    ERROR_CODE_MSG,
    COOKIE_MSG,
    SERVER_RTN_MSG_EXPENSE,
    DB_RTN_MSG
}