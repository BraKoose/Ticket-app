const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
    // console.log(name)
    // res.json({ message: "return form user router" })

    next()
});


router.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

module.exports = router;