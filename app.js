const express = require("express");
const app = express();
const router = require("./routes/ProductRoute");

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
