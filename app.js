require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 4003
const app = express();



//API SECURITY
app.use(helmet())
//handle cors Error
app.use(cors())

//Logger 
app.use(morgan("tiny"))

//MongoDb Connection 
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

if (process.env.NODE_ENV !== 'production') {
    const connection = mongoose.connection;

    connection.on("open", () => {
        console.log("MONGO DB is connected")
    });

    connection.on("error", (error) => {
        console.log(error)
    });


}



//Set Body-parser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())



//Load Routers

const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router")


//use Router 
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter
)




// app.use("/", (req, res) => {
//     res.json({
//         message: "Breakfast Koose"
//     })
// })

app.use((req, res, next) => {
    const error = new Error("Resources not found!")
    error.status = 404
    next(error)
});

app.use((error, req, res, next) => {
    handleError(error, res);
});

//Error Handle
const handleError = require("./src/utils/errorHandle")



app.listen(port, () => {
    console.log(`ApI is ready on http://localhost:${port}`)
})