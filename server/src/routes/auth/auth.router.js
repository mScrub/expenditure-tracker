const express = require('express');

const { 
    httpAuthUser,
    httpHandleRefreshT
} = require('./auth.controller')

const authRouter = express.Router();

authRouter.post('/auth', httpAuthUser)
authRouter.get('/refresh', httpHandleRefreshT)

module.exports = authRouter;