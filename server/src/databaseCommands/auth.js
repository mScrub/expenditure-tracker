const mySQLDB = require('../databaseConnectionSQL');

async function getUsers() {
    let getUserSQL = `
    SELECT username, user_id, email, hashed_password
    FROM user`

    try {
        const users = await mySQLDB.query(getUserSQL)
        console.log("Retrieved users")
        return users[0] ;
    }
    catch (error) {
        console.log("Error inserting user")
        return false;
    }
}

module.exports = { getUsers };