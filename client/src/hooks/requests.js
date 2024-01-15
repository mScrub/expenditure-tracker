const API_URL = process.env.REACT_APP_API_URL

async function httpCreateUserFE(userData) {
    try {
        return await fetch(`${API_URL}/submitUser`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
    } catch (err) { 
        return {
            ok: false,
            error: "Missing required sign up field"
        }
    }
}

export  {
    httpCreateUserFE
}