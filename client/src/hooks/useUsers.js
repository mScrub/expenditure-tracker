import { httpCreateUserFE } from './requests';

function useUsers() {
    const submitUser = (async (e) => { 
        const userData = new FormData(e.target);
        const username = userData.get('username')
        const email = userData.get('email')
        const password = userData.get('password')
        const response = await httpCreateUserFE({
            username, email, password
        })
        const success = response.ok
        const message = response.message
        if (message === "Email Conflict" && !success) {
            return {
                ok: false,
                message: "Duplicate Email"
            }
        } else if (message === "Missing Data" && !success) {
            return {
                ok: false,
                message: "Missing Form Field Data"
            }
        } else {
            return {
                ok: true,
                message: undefined 
            }
        }
    })

    return { 
        submitUser
    }
}


export default useUsers;