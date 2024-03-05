const db_auth = require("../databaseCommands/auth")

async function getUsers() {
    const users = await db_auth.getUsers();
    return users;
}

module.exports = {
    getUsers
}