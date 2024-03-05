const express = require('express');

const { 
    httpAuthUser
} = require('./auth.controller')

const authRouter = express.Router();

authRouter.post('/auth', httpAuthUser)

module.exports = authRouter;