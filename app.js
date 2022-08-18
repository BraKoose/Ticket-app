const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const app = express()

//API SECURITY
app.use(helmet())

//handle cors Error
app.use(cors())

//Logger 
app.use(morgan("tiny"))

//Set Body-parser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())


const port = process.env.PORT || 4001

app.use("/", (req, res) => {
    res.json({
        message: "Breakfast Koose"
    })
})


app.listen(port, () => {
    console.log(`ApI is ready on http://localhost:${port}`)
})