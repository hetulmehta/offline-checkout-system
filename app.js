const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/ProductRoute");

app.use(cors({
    origin : "*",
}));
app.use(express.json())
app.use("/" , router);

app.all("*" , (req,res,next)=>{
   return next(NotFoundError("This route does not exists!"));
});

app.use((err,req,res)=>{
    res.status(err.statusCode).json({
        status : "Failed",
        message : err.message,
    });
})

module.exports = app;
