const mySQLDB = require('../databaseConnectionSQL');
const db_lookup = require('../utilities/server.obj.lookup')
const startT = db_lookup.DB_QUERY_MSG.START_T
const rollback = db_lookup.DB_QUERY_MSG.ROLLBACK
const commit = db_lookup.DB_QUERY_MSG.COMMIT

async function generateUUID() {
    let generateUUIDSQL = `SELECT uuidGen()`
    try {
        let uuidValue = await mySQLDB.query(generateUUIDSQL)
        console.log("Successfully created uuid")
        return uuidValue[0][0]['uuidGen()'];
    } catch (err) {
        console.log("Failed to generate uuid")
    }
}

async function verifyUUID(currentUUID) {
    const verifyUUIDSQL = `
    SELECT unique_url
    FROM expense
    `
    const uuidResult = await mySQLDB.query(verifyUUIDSQL)
    const checkUUID = (uuidVal) => {
        return uuidVal['unique_url'] === currentUUID
    }

    if (uuidResult[0].find(checkUUID)) {
        await mySQLDB.query(rollback)
        return {
            errorMsg: "Transaction failed",
            isUnique: false
        }
    } else {
        return {
            currentUUID: currentUUID,
            isUnique: true
        }
    }
}

async function createExpense(postExpenseData) {

    const storedUUID = await generateUUID();
    const lowerCaseUUID = storedUUID.toLowerCase();

    try {
        await mySQLDB.query(startT)
        const uuidCheckObj = await verifyUUID(lowerCaseUUID)

        if (!uuidCheckObj.isUnique) {
            await mySQLDB.query(rollback)
            return {
                message: db_lookup.DB_RTN_MSG.recreateExpense,
                isSuccess: false
            }
        } else {
            let createExpenseSQL =
                `INSERT INTO expense(address, location_name, amount_spent, date_of_exp, unique_url, user_id)
                 VALUES(:address, :locationName, :amountSpent, :date, :uniqueUUID, :userId)`

            let paramsForExpense = {
                userId: postExpenseData.userId,
                address: postExpenseData.address,
                locationName: postExpenseData.locationName,
                amountSpent: postExpenseData.amountSpent,
                date: postExpenseData.date,
                uniqueUUID: uuidCheckObj.currentUUID
            }

            await mySQLDB.query(createExpenseSQL, paramsForExpense)
            await mySQLDB.query(commit);
            console.log("Successfully created expense")
            return {
                isSuccess: true
            }
        }

    } catch (error) {
        console.log(error)
        console.log("Error inserting expense")
        mySQLDB.query(rollback)
        return {
            error: error.sqlMessage,
            isSuccess: false
        }
    }
}

async function getExpenseList(paramsData) {
    let getExpenseListSQL = `
    SELECT expense_id, address, location_name, amount_spent, date_of_exp, unique_url 
    FROM expense 
    WHERE user_id = :user_id`

    let expenseRetrievalParams = {
        user_id: paramsData.userId
    }

    try {
        let expenseListResult = await mySQLDB.query(getExpenseListSQL, expenseRetrievalParams)
        console.log("Expense List retrieved successfully")
        return {
            expenseListData: expenseListResult[0],
            isSuccessRetrieval: true
        }

    } catch (error) {
        console.log(error)
        console.log("Failed to retrieve expense list")
        return {
            error: error.sqlMessage,
            isSuccessRetrieval: false
        }
    }
}

async function getExpensePostDetail(paramsData) {
    try {
        let getExpensePostDetailSQL = `
        SELECT address, location_name, amount_spent, date_of_exp 
        FROM expense
        WHERE user_id = :userId
        AND unique_url = :paramsId`

        let postDetExpenseParams = {
            paramsId: paramsData.postDetailId,
            userId: paramsData.userId,
        }

        const postDetResult = await mySQLDB.query(getExpensePostDetailSQL, postDetExpenseParams)
        if (postDetResult[0].length === 0) {
            throw new Error(db_lookup.DB_RTN_MSG.noSuchExpDetailPost)
        }
        return {
            expensePostDetail: postDetResult[0],
            isSuccessRetrieval: true 
        }
    } catch (error) {
        console.log("Unsuccessful retrieval of expense post detail");
        console.log(error);
        return {
            expensePostDetail: [],
            error: error.sqlMessage,
            isSuccessRetrieval: false
        }
    }
}

module.exports = {
    createExpense,
    getExpenseList,
    getExpensePostDetail
}