const express = require('express')

const { 
    httpGetAllUsers,
    renderSignupPage,
    httpCreateUser,
} = require('./users.controller')

const usersRouter = express.Router();

usersRouter.get('/signup', renderSignupPage)
usersRouter.post('/submitUser', httpCreateUser) 
usersRouter.get('/users', httpGetAllUsers)

module.exports = usersRouter;