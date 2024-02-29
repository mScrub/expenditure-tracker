const API_URL = process.env.REACT_APP_API_URL

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
            if (response.status === 409) throw new Error("409, Conflict");
            if (response.status === 400) throw new Error("400, Missing Data");
            throw new Error(response.status);
        }
    } catch (error) {
        console.error("Fetch", error);
        let errorContent = error.toString();
        if (errorContent.includes("409")) {
            return {
                ok: false,
                message: "Email Conflict"
            }
        } else if (errorContent.includes("400")) {
            return {
                ok: false,
                message: "Missing Data"
            }
        } else {
            return {
                ok: true
            }
        }
    }
}

async function httpCreateExpense(expenseData) {
    try {
        return await fetch(`${API_URL}/submitExpense`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseData)
        })

    } catch (error) {
        return {
            ok: false,
            error: "Failed to make post request"

        }
    }
}

async function httpGetExpenseList() {
    try {
        const response = await fetch(`${API_URL}/getExpenseList`, {
            method: "get",
        })
        const respData = await response.json();
        return respData;
    } catch (err) {
        return {
            ok: false,
            error: "Failed to retrieve expense post for this user"
        }
    }
}

async function httpGetExpensePostDetail({
    params
}) {
    try {
        const response = await fetch(`${API_URL}/expenseHistory/${params.expensePostId}`)
        const postData = await response.json()
        return postData;
    } catch (error) {
        return {
            ok: false,
            error: "Unable to fetch post details"
        }
    }
}

export {
    httpCreateUserFE,
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail
}