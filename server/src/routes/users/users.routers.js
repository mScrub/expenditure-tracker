const express = require('express')

const { 
    httpGetAllUsers,
    renderSignupPage,
    httpCreateUser,
    httpSignIn,
} = require('./users.controller')

const usersRouter = express.Router();

usersRouter.get('/signup', renderSignupPage)
usersRouter.get('/signin', httpSignIn)
usersRouter.post('/submitUser', httpCreateUser) 
usersRouter.get('/users', httpGetAllUsers)

module.exports = usersRouter;