const db_expenses = require("../databaseCommands/expenses")
const moment = require('moment')

async function addExpense(expenseData) {
    let address = expenseData.address
    let locationName = expenseData.locationName
    let amountSpent = expenseData.amountSpent
    let dateOfE = moment(expenseData.date).format('YYYY-MM-DD')
    let success = await db_expenses.createExpense({
        address: address,
        locationName: locationName,
        amountSpent: amountSpent,
        date: dateOfE
    })
    return success
}

async function getExpenseList(loggedInUser) {
    let success = await db_expenses.getExpenseList({
        userId: 1
    })
    console.log(success + "Retrieved after DB")
    return success
}

async function getExpensePostDet(expenseParamsID) {
    let postDetail = await db_expenses.getExpensePostDetail({
        userId: 1,
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