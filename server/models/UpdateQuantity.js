const Database = require("../services/DBConnect");
const {DatabaseError , ClientError} = require("../Error");

const IncreaseQuantity = async (userID , eancode)=>{

    const conn = await Database.getConnection();
    try{

        await conn.beginTransaction();

        const query = `
             SELECT Product.quantity,Cart.Quantity from Product 
             JOIN Cart ON
             Product.eancode = Cart.Eancode
             WHERE Cart.Eancode = ?
             and Cart.userID = ?;  
        `
        
        const resp = await conn.query(query,[eancode , userID]);

        if(resp[0]){
            if(resp[0].quantity > resp[0].Quantity + 1){
                await conn.query(` UPDATE Cart SET Quantity = ? Where userID = ?` , [resp[0].Quantity + 1 , userID]);
            }else{
                throw new DatabaseError("Product out of stock!");
            }
        }else{
            throw new ClientError("No such product in the cart!");
        }

        await conn.commit();
        await conn.release();

        return;

    }catch(err){
         conn.rollback();
         console.log(err);
         throw err;
    }
}

const DecreaseQuantity = async (userID , eancode)=>{

    const conn = await Database.getConnection();
    try{

        await conn.beginTransaction();

        const query = `
             SELECT Quantity from Cart
             WHERE Eancode = ?
             and userID = ?;  
        `
        
        const resp = await conn.query(query,[eancode , userID]);

        if(resp[0]){
                await conn.query(` UPDATE Cart SET Quantity = ? Where userID = ?` , [resp[0].Quantity - 1 , userID]);
        }else{
            throw new ClientError("No such product in the cart!");
        }

        await conn.commit();
        await conn.release();

        return;

    }catch(err){
         conn.rollback();
         console.log(err);
         throw err;
    }
}

module.exports = {
    IncreaseQuantity,
    DecreaseQuantity
}