const express = require("express");
const addtocart = require("../models/addtocart");
const FetchOneProduct = require("../models/FetchProducts");
const listcart=require("../models/listcart")
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
Product.post("/addtocart", async (req, res, next) => {
    try{
        const result= await addtocart(req.body.userID,req.body.eancode)
        if (result){
            res.json({"success":true})
        }
        else{
            res.json({"success":false})
        }
    }
    catch(err){console.log(err)}
    });
Product.get("/checkout/:id", async (req, res, next) => {
    try{
        const result= await listcart(req.params.id)
        return res.json({
            success: true,
            data: result,
        });
    }
    catch(err){
        console.log(err)
    }
});


module.exports = Product;
