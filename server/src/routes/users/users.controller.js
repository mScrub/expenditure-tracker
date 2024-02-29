const {addUser} = require ('../../models/users.models')

async function httpCreateUser(req, res) {
    let user = req.body
    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({"message": "Missing required sign up field"})
    }
    const emails = await getEmails();
    const duplicate = emails.find(existingUser => existingUser.email === user.email)
    if (duplicate) return res.status(409).json({"message": "Duplicate email."})
    const pendingUserCreation = await addUser(user)
    if (!pendingUserCreation.isSuccess) {
        return res.status(400).json({"message": "Duplicate email!"})
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