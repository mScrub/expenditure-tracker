const express = require('express')

const {
    httpCreateExpense
} = require('./expenses.controller')

const expensesRouter = express.Router();

expensesRouter.post('/submitExpense', httpCreateExpense);

module.exports = expensesRouter;