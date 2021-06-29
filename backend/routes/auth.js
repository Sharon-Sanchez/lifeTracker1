const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // take the users email and password and attempting to authenticate them
    }catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // take the users email, pass,
        // and create a new user in our database
    } catch(err) {
        next(err)
    }
})

module.exports = router