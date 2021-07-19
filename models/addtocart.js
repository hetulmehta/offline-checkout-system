const { NotFoundError, ClientError } = require("../Error");
const Database = require("../services/DBConnect");

const addtocart = async (userID, eancode) => {
    const conn = await Database.getConnection();
  try {
    await conn.beginTransaction();
    const result = await conn.query(
      `
        INSERT INTO Cart(userID,eancode) VALUES(?,?)
    `,
      [userID, eancode]
    );
    const rows2 = await conn.query(
      `
            UPDATE Product SET isaddedtocart=1 WHERE Eancode =?   
        `,
      [eancode]
    );
    await conn.commit();
    conn.release();
    return rows2;
  } catch (err) {
    await conn.rollback().catch(() => {});
    conn.release();
    console.log(err);
  }
};

module.exports = addtocart;
