const ERROR_MSG = {
    usernameConflict: "Username Conflict",
    duplicateUsername: "Duplicate Username",
    missingData: "Missing Data",
    failedExpDetailsFetch: "Unable to fetch post details",
    noExpDetail: "No such post detail"
}

const ERROR_CODES = {
    400 : "400",
    401 : "401",
    403 : "403",
    409 : "409",
}

const ERROR_THROWS = {
    throw400 : "400, Missing Data",
    throw409 : "409, Conflict",
}



module.exports = {
    ERROR_MSG,
    ERROR_CODES,
    ERROR_THROWS
}