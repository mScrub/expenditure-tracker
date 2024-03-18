const API_URL = process.env.REACT_APP_API_URL
const lookup = require('../utilities/objectLookup')

async function httpCreateUserFE(userData) {
    try {
        const response = await fetch(`${API_URL}/submitUser`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if (response.ok) {
            return response;
        } else {
            if (response.status === lookup.ERROR_CODES[409]) throw new Error(lookup.ERROR_THROWS.throw409);
            if (response.status === lookup.ERROR_CODES[400]) throw new Error(lookup.ERROR_THROWS.throw400);
            throw new Error(response.status);
        }
    } catch (error) {
        console.error("Fetch", error);
        let errorContent = error.toString();
        if (errorContent.includes(lookup.ERROR_CODES[409])) {
            return {
                ok: false,
                message: lookup.ERROR_MSG.usernameConflict
            }
        } else if (errorContent.includes(lookup.ERROR_CODES[400])) {
            return {
                ok: false,
                message: lookup.ERROR_MSG.missingData
            }
        } else {
            return {
                ok: true
            }
        }
    }
}

export {
    httpCreateUserFE,
}