const mySQLDB = require('../databaseConnectionSQL');

async function createUser(postUserData) {
    let createUserSQL = `
    INSERT INTO user(username, email, hashed_password, user_type_id)
    VALUES (:username, :email, :hashedPW, 
        (SELECT user_type_id
        FROM user_type
        WHERE user_type = "user"));
    `;
    let paramsForUserCreation = {
        username: postUserData.username,
        email: postUserData.email,
        hashedPW: postUserData.hashedPassword
    }
    try {
        const result = await mySQLDB.query(createUserSQL, paramsForUserCreation)
        console.log("Successfully created user")
        console.log(result)
        return {
            isSuccess: true
        };
    }
    catch (error) {
        console.log(error)
        console.log("Error inserting user")
        return {
            error: error.sqlMessage, 
            isSuccess: false
        };
    }
}

async function getEmails() {
    let getEmailsSQL = `
    SELECT email
    FROM user`

    try {
        const emailResult = await mySQLDB.query(getEmailsSQL);
        console.log("Succeeded in email list retrieval")      
        return emailResult[0];
    } catch (err) {
        console.log("Failed to retrieve emails");
    }
}

async function getUsers() {
    let getUserSQL = `
    SELECT email, username, hashed_password
    FROM user`

    try {
        const users = await mySQLDB.query(getUserSQL)
        console.log("Retrieved users")
        return users[0];
    }
    catch (error) {
        console.log("Error inserting user")
        return false;
    }
}

module.exports = {createUser, getUsers, getEmails}