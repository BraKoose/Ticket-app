const express = require("express");
const router = express.Router();

const { insertUser } = require("../model/user/User.Model")

router.all("/", (req, res, next) => {
    // console.log(name)
    // res.json({ message: "return form user router" })

    next()
});


router.post('/', async (req, res) => {

    try {

        const result = await insertUser(req.body)
        console.log(result)

        res.json({ message: "New User Created", result })



    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })

    }

});

module.exports = router;