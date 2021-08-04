const express = require("express");
const addtocart = require("../models/addtocart");
const FetchOneProduct = require("../models/FetchProducts");
const FetchAllProduct = require("../models/FetchAllProduct");
const listcart = require("../models/listcart");
const RemoveFromCart = require("../models/RemoveFromCart");
const CheckoutUser = require("../models/CheckoutUser");
const {IncreaseQuantity , DecreaseQuantity} = require("../models/UpdateQuantity");

const Product = express.Router();

Product.get("/fetchproduct/:eancode/:id", async (req, res, next) => {
    try {
        console.log("Request recieved!");
        const result = await FetchOneProduct(req.params.id, req.params.eancode);
        return res.status(200).json({
            success: "true",
            data: result,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});
Product.post("/addtocart", async (req, res, next) => {
    try {
        const result = await addtocart(req.body.userID, req.body.eancode);
        if (result) {
            res.status(201).json({
                success: "true",
                message: "Item successfully added into the cart!",
            });
        }
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

Product.get("/usercart/:id", async (req, res, next) => {
    try {
        // console.log("hellooo");
        const result = await listcart(req.params.id);
        return res.status(200).json({
            success: "true",
            data: result,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

Product.post("/increaseQuantity/:id" , async (req,res,next)=>{
   try{
      await IncreaseQuantity(req.params.id , req.body.eancode);

      res.status(200).json({
          status : "true",
      });

   }catch(err){
       next(err);
   }
});

Product.post("/decreaseQuantity/:id" , async (req,res,next)=>{
    try{
       await DecreaseQuantity(req.params.id , req.body.eancode);
 
       res.status(200).json({
           status : "true",
       });
 
    }catch(err){
        next(err);
    }
 });

Product.post("/removefromcart", async (req, res, next) => {
    try {
        await RemoveFromCart(req.body.userID, req.body.eancode);
        res.status(200).json({
            status: "success",
            message: "Item removed from the cart!",
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

Product.get("/inventory", async (req, res, next) => {
    try {
        const result = await FetchAllProduct();
        return res.status(200).json({
            status: "success",
            data: result,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

Product.get("/checkout/:userid", async (req, res, next) => {
    try {
        await CheckoutUser(req.params.userid);
        return res.status(200).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = Product;
