const {
    addExpense
} = require('../../models/expenses.models')

const httpCreateExpense = async (req, res) => {
    let expense = req.body;
    if (!expense.address || !expense.locationName || !expense.amountSpent || !expense.date) {
        return res.status(400).json({
            error: 'Missing one of the required expense entry fields'
        })
    }
    const pendingExpense = await addExpense(expense)
    if (pendingExpense & !pendingExpense.isSuccess) {
        return res.status(400).json({
            error: 'Unsuccessful expense creation'
        })
    }
    else {
        return res.status(201).json(pendingExpense)
    }
}

module.exports = {
    httpCreateExpense
}
