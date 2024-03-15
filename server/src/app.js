const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();
const usersRouter = require('./routes/users/users.routers')
const expensesRouter = require('./routes/expenses/expenses.router');
const authRouter = require('./routes/auth/auth.router');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions');
const credentials = require('../middleware/credentials');
const app = express();

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(usersRouter);
app.use(authRouter);

app.use(verifyJWT);
app.use(expensesRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;