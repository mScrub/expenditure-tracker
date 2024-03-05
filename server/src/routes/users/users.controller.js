const { addUser, getEmails, getUsers} = require ('../../models/users.models')
const jwt = require('jsonwebtoken')


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
        return res.status(400).json({"message": pendingUserCreation.message})
    }
    else {
        return res.status(201).json(pendingUserCreation)
    }
}

async function httpAuthUser(req, res) {
    const user = req.body
    if (!user.email || !user.password) return res.status(400).json({
        "message": "Email and password are needed."
    })
    const users = await getUsers();
    const locatedUser = users.find(person => person.email === user.email);
    if (!locatedUser) return res.status(401);
    const pwMatch = await bcrypt.compare(user.password, locatedUser.hashed_password)
    if (pwMatch) {
        const accessToken = jwt.sign(
            {"username": locatedUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"username": locatedUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        res.cookie('jwt', refreshToken, {maxAge:  24 * 60 * 60 * 1000, httpOnly: true, secure: true})
        res.json({
            "aT": accessToken,
            "success": `User ${locatedUser.username} logged in succesfully!`
        })
    } else {
        return res.status(401).json({"message" : "Unauthorized"});
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
    httpAuthUser,
}