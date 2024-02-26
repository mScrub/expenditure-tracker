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



module.exports = {
    addExpense,
    getExpenseList
}