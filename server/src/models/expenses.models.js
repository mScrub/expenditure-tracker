const db_expenses = require("../databaseCommands/expenses")
const moment = require('moment')

async function addExpense(uid, expenseData) {
    const userId = uid; 
    let address = expenseData.address
    let locationName = expenseData.locationName
    let amountSpent = expenseData.amountSpent
    let dateOfE = moment(expenseData.date).format('YYYY-MM-DD')
    let success = await db_expenses.createExpense({
        userId: userId,
        address: address,
        locationName: locationName,
        amountSpent: amountSpent,
        date: dateOfE
    })
    return success
}

async function getExpenseList(uid) {
    let success = await db_expenses.getExpenseList({
        userId: uid
    })
    return success
}

async function getExpensePostDet(uid, expenseParamsID) {
    let postDetail = await db_expenses.getExpensePostDetail({
        userId: uid,
        postDetailId: expenseParamsID  
    })
    let postDetailCopy = [...postDetail.expensePostDetail, {isSuccessRetrieval: postDetail.isSuccessRetrieval, error: postDetail.error}];
    postDetailCopy[0].date_of_exp = moment(postDetailCopy[0].date_of_exp).format("YYYY-MM-DD")
    return postDetailCopy
}

module.exports = {
    addExpense,
    getExpenseList,
    getExpensePostDet
}