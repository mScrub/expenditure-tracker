const {addUser} = require ('../../models/users.models')

async function httpCreateUser(req, res) {
    let user = req.body
    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({error: "Missing required sign up field"})
    }
    const pendingUserCreation = await addUser(user)
    if (!pendingUserCreation.isSuccess) {
        return res.status(400).json({error: "Duplicate email!"})
    }
    else {
        return res.status(201).json(pendingUserCreation)
    }
}

function renderSignupPage(req, res) {
    return res.json('index')
}

function httpGetAllUsers(req, res) {
    return;
}

module.exports = {
    httpCreateUser,
    renderSignupPage,
    httpGetAllUsers,
}