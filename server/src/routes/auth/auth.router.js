const express = require('express');

const { 
    httpAuthUser,
    httpHandleRefreshT,
    httpLogout,
} = require('./auth.controller')

const authRouter = express.Router();

authRouter.post('/auth', httpAuthUser)
authRouter.get('/refresh', httpHandleRefreshT)
authRouter.get('/logout', httpLogout)

module.exports = authRouter;