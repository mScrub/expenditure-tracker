const db_users = require("../databaseCommands/users")
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function addUser(userData) {  
    let username = userData.username;
    let email = userData.email;
    let password = userData.password;
    let hashedPassword = bcrypt.hashSync(password, saltRounds)
    let successObj = await db_users.createUser({email: email, hashedPassword: hashedPassword, username: username} )
    return successObj;
}


module.exports = {addUser}