const express = require("express");
const router = express.Router();

const { insertUser } = require("../model/user/User.Model")

const { hashPassword } = require("../helpers/")

router.all("/", (req, res, next) => {
    // console.log(name)
    // res.json({ message: "return form user router" })

    next()
});


router.post('/', async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;

    try {

        //hashed Password 

        const hashedPass = await hashPassword(password)

        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass
        }

        const result = await insertUser(newUserObj)
        console.log(result)

        res.json({ message: "New User Created", result })



    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })

    }

});

module.exports = router;