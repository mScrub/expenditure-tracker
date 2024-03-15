const express = require('express')

const { 
    httpCreateUser,
} = require('./users.controller')

const usersRouter = express.Router();

usersRouter.post('/submitUser', httpCreateUser) 

module.exports = usersRouter;