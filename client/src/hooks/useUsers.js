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
        if (success) {
            return true;
        } else {
            return false;
        }
    })

    return { 
        submitUser
    }
}


export default useUsers;