const express = require("express");
const app = express();
const { NotFoundError, ClientError } = require("./Error");
const FetchOneProduct = require("./models/FetchProducts");

app.get("/:eancode", async (req, res) => {
    const result = await FetchOneProduct(req.params.eancode);

    return res.json({
        success: true,
        data: result,
    });
});


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
