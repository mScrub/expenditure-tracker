const express = require('express');

const { 
    httpAuthUser,
    httpHandleRefreshT,
    httpLogout,
} = require('./auth.controller')

const authRouter = express.Router();
const authRoute = process.env.AUTH_ROUTE
const refreshRoute = process.env.REFRESH_ROUTE

authRouter.post(authRoute, httpAuthUser)
authRouter.get(refreshRoute, httpHandleRefreshT)
authRouter.get('/logout', httpLogout)

module.exports = authRouter;