const express = require('express')

const {
    httpCreateExpense,
    httpGetExpenseList,
} = require('./expenses.controller')

const expensesRouter = express.Router();

expensesRouter.post('/submitExpense', httpCreateExpense);
expensesRouter.get('/getExpenseList', httpGetExpenseList)

module.exports = expensesRouter;