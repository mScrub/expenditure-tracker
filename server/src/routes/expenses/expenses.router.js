const express = require('express')

const {
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail,
} = require('./expenses.controller')

const expensesRouter = express.Router();

expensesRouter.post('/submitExpense', httpCreateExpense);
expensesRouter.get('/getExpenseList', httpGetExpenseList)
expensesRouter.get('/expenseHistory/:expensePostId', httpGetExpensePostDetail)

module.exports = expensesRouter;