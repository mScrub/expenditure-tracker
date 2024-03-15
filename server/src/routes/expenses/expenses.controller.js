const {
    addExpense,
    getExpenseList,
    getExpensePostDet,
} = require('../../models/expenses.models')
const srvLookup = require('../../utilities/server.obj.lookup')

const httpCreateExpense = async (req, res) => {
    const uid = req.uid;
    let expense = req.body;
    if (!expense.address || !expense.locationName || !expense.amountSpent || !expense.date) {
        return res.status(400).json({
            message: srvLookup.SERVER_RTN_MSG_EXPENSE.missingInputFieldsOnCreateExpense
        })
    }
    const pendingExpense = await addExpense(uid, expense)
    if (pendingExpense & !pendingExpense.isSuccess) {
        return res.status(400).json({
            message: srvLookup.SERVER_RTN_MSG_EXPENSE.unsuccessfulExpCreation
        })
    }
    else {
        return res.status(201).json(pendingExpense)
    }
}

const httpGetExpenseList = async (req, res) => {
    const uid = req.uid;
    let pendingRetrieval = await getExpenseList(uid)
    if (!pendingRetrieval.isSuccessRetrieval) {
        return res.status(400).json({
            message: srvLookup.SERVER_RTN_MSG_EXPENSE.failedDetailRetrieval
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
    const uid = req.uid;
    let expenseParamsId = req.params.expensePostId; 
    const expensePostDetails = await getExpensePostDet(uid, expenseParamsId)
    if (expensePostDetails[1] === undefined) {
        if (!expensePostDetails[0].isSuccessRetrieval) {
            return res.status(400).json({
                message: srvLookup.SERVER_RTN_MSG_EXPENSE.failedDetailRetrieval
        })}
    } else {
        if (expensePostDetails[1].isSuccessRetrieval) {
            res.status(200).json({
                ok: true, 
                expenseDetail: expensePostDetails
        }) 
    }
}}

module.exports = {
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail
}
