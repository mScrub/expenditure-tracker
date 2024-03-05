import { httpCreateUserFE } from './requests';
const lookup = require('../utilities/objectLookup')

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
        if (message === lookup.ERROR_MSG.usernameConflict && !success) {
            return {
                ok: false,
                message: lookup.ERROR_MSG.duplicateUsername
            }
        } else if (message === lookup.ERROR_MSG.missingData && !success) {
            return {
                ok: false,
                message: lookup.ERROR_MSG.missingData
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