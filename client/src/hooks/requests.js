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

async function httpGetExpensePostDetail({params}) {
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

export  {
    httpCreateUserFE,
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail
}