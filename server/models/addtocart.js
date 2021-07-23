const { ClientError } = require("../Error");
const Database = require("../services/DBConnect");

const addtocart = async (userID, eancode) => {
  const conn = await Database.getConnection();
  
  try {
    await conn.beginTransaction();

    const resp = await conn.query(
      `SELECT cartID FROM Cart WHERE Eancode = ? AND  userID = ?` , 
      [eancode , userID]
    );

    if(resp[0]){
      throw new ClientError("Item already added into the cart!");
    }

    const result = await conn.query(
      `
        INSERT INTO Cart(userID,eancode) VALUES(?,?)
    `,
      [userID, eancode]
    );


    await conn.commit();
    conn.release();

    console.log("result1 : "  + result.insertId);

    return result;

  } catch (err) {
    await conn.rollback();
    conn.release();
    console.log("Error : " + err);
    throw err;
  }
};

module.exports = addtocart;
