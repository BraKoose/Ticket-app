const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail } = require("../model/user/User.Model")

const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper")

router.all("/", (req, res, next) => {
    // console.log(name)
    // res.json({ message: "return form user router" })

    next()
});


//create New User
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

//Login Already User In 

router.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid form submission" });
    }

    //get userID email from db

    const user = await getUserByEmail(email)

    console.log(user)

    const passFromDb = user && user._id ? user.password : null

    if (!passFromDb) return res.json({ status: "error", message: "ivalid email or password" })

    const result = await comparePassword(password, passFromDb)
    console.log(result)

    res.json({ status: "sucesss", message: "Login Success" });
});

module.exports = router;