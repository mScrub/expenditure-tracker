function isAlphaNumeric(str) {
    return str.match(/^[a-zA-Z0-9]+$/) !== null;
}

function isNumeric(str) {
    return str.match(/^\d+(\.\d)?\d*$/) !== null;
}

export {
    isAlphaNumeric,
    isNumeric
}