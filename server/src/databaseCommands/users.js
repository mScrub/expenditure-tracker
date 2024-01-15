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

async function getUser() {
    let getUserSQL = `
    SELECT *
    FROM 
    user`

    try {
        const result = await mySQLDB.query(getUserSQL)
        console.log("Retrieved users")
        return true;
    }
    catch (error) {
        console.log("Error inserting user")
        return false;
    }
}

module.exports = {createUser, getUser}