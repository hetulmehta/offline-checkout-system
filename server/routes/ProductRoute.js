const express = require("express");
const addtocart = require("../models/addtocart");
const FetchOneProduct = require("../models/FetchProducts");
const listcart=require("../models/listcart");
const {InternalServerError, ClientError} = require("../Error");
const Product = express.Router();

Product.get("/:eancode", async (req, res, next) => {
    try{
        console.log("Request recieved!");
        const result = await FetchOneProduct(req.params.eancode);
        return res.status(200).json({
            success: 'true',
            data: result,
        });
    }catch(err){
        console.log(err);
        return next(new InternalServerError("Something went wrong!"));
    }
});
Product.post("/addtocart", async (req, res, next) => {
    try{
        const result = await addtocart(req.body.userID,req.body.eancode);
        if (result){
            res.status(201).json(
                {
                    success: 'true',
                    message : "Item successfully added into the cart!"
                }
            )
        }
    }
    catch(err){
        console.log(err);
        if(err.text.includes("Duplicate entry")){
            return next(new ClientError("Item already added into the cart"));
        }
        else{
            return next(new InternalServerError("Something went wrong!"));
        }
    }
    });
    
Product.get("/checkout/:id", async (req, res, next) => {
    try{
        const result = await listcart(req.params.id);
        return res.status(200).json({
            success: 'true',
            data: result,
        });
    }
    catch(err){
        console.log(err);
        return next(new InternalServerError("Something went wrong!"));
    }
});


module.exports = Product;
