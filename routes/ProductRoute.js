const express = require("express");
const FetchOneProduct = require("./models/FetchProducts");
const Product = express.Router();

Product.get("/:eancode", async (req, res, next) => {
    try{
        const result = await FetchOneProduct(req.params.eancode);
        return res.json({
            success: true,
            data: result,
        });
    }catch(err){
        return next(err);
    }
});

module.exports = Product;
