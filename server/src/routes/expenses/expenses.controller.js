const {
    addExpense,
    getExpenseList,
    getExpensePostDet,
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

const httpGetExpenseList = async (req, res) => {
    let pendingRetrieval = await getExpenseList(1)
    if (!pendingRetrieval.isSuccessRetrieval) {
        return res.status(400).json({
            error: "Failed to retrieve expense post list"
        })
    } else {
        console.log(pendingRetrieval.expenseListData)
        return res.status(200).json({
            ok: true,
            expenseList: pendingRetrieval.expenseListData
        })
    }
}

const httpGetExpensePostDetail = async (req, res) => {
    let expenseParamsId = req.params.expensePostId; 
    const expensePostDetails = await getExpensePostDet(expenseParamsId)
    if (!expensePostDetails[1].isSuccessRetrieval) {
        return res.status(400).json({
            error: "Failed to retrieve expense post detail"
        })
    } else {
        res.status(200).json({
            ok: true, 
            expenseDetail: expensePostDetails
        })
    }
}

module.exports = {
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail
}
