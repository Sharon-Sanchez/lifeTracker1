const express = require("express")
const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        //create a new nutrition activity

    }catch(err) {
        next(err)
    }
})

router.put("/:postID", async (req, res, next) => {
    try {
        //update nutrition info

    }catch(err) {
        next(err)
    }
})

router.get("/:postID", async (req, res, next) => {
    try {
        //Get one nutrition activity users created (database query)

    }catch(err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        //list all the nutrition activity users created (database query)

    }catch(err) {
        next(err)
    }
})



module.exports = router