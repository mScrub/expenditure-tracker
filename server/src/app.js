const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const usersRouter = require('./routes/users/users.routers')
const expensesRouter = require('./routes/users/expenses/expenses.routers');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(usersRouter);
app.use(expensesRouter);

app.get('/*', (req, res) => {
x
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;