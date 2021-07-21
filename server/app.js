const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/ProductRoute");
const {NotFoundError} = require("./Error");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors({
    origin : "*",
}));
app.use(express.json())
app.use("/" , router);

app.all("*" , (req,res,next)=>{
   return next(new NotFoundError("This route does not exists!"));
});

app.use((err,req,res)=>{
    res.status(err.statusCode).json({
        status : "Failed",
        message : err.message,
    });
})

module.exports = app;
