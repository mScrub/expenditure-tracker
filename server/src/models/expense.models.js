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


module.exports = {
    addExpense,
}