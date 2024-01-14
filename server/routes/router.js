const router = require("express").Router();
const MongoStore = require("connect-mongo");
const session = require("express-session");
const Joi = require("joi");
const bcrypt = require("bcrypt");
require("dotenv").config();

function isValidSession(req) {
    console.log("isValidSession")
    if (req.session.authenticated) {
      return true;
    }
    return false;
}
  
router.get("/", sessionValidation, async (req, res) => {
    console.log("idex page hit")
    const isLoggedIn = isValidSession(req)
  });