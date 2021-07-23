const express = require("express");
const addtocart = require("../models/addtocart");
const FetchOneProduct = require("../models/FetchProducts");
const listcart=require("../models/listcart");
const RemoveFromCart = require("../models/RemoveFromCart");
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
        return next(err);
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
            return next(err);
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
        return next(err);
    }
});

Product.post("/removefromcart" , async (req,res,next)=>{
      try{
      
      await RemoveFromCart(req.body.userID , req.body.eancode);
      res.status(200).json({
          status : "success",
          message : "Item removed from the cart!",
      });
        
      }catch(err){
          console.log(err);
          return next(err);
      }
});


module.exports = Product;
