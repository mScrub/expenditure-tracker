const {
    addUser,
    getUsernames,
} = require('../../models/users.models')
const srvLookup = require('../../utilities/server.obj.lookup')

async function httpCreateUser(req, res) {
    let user = req.body
    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({
            message: srvLookup.SERVER_RTN_MSG_USER.missingInputFieldsOnCreation
        })
    }
    const users = await getUsernames();
    const duplicate = users.find(existingUser => existingUser.username === user.username)
    if (duplicate) return res.status(409).json({
        message: srvLookup.SERVER_RTN_MSG_USER.duplicateUsername
    })
    const pendingUserCreation = await addUser(user)
    if (!pendingUserCreation.isSuccess) {
        return res.status(400).json({
            message: pendingUserCreation.message
        })
    } else {
        return res.status(201).json(pendingUserCreation)
    }
}

module.exports = {
    httpCreateUser,
}