const Database = require("../services/DBConnect");

const FetchOneProduct = async (userID,eancode) => {
    const conn = await Database.getConnection();
    try {
        
        await conn.beginTransaction();

        const resp = await conn.query(
            `SELECT cartID from Levyne.Cart  WHERE Cart.Eancode = ? AND Cart.userID = ?`
            ,
            [eancode,userID]
        )

        const query = `
            SELECT * FROM Product
            WHERE eancode=?
        `;

        const result = await conn.query(query, eancode);
        if(resp[0]){
            result[0]["inCart"] = true;
        }

        console.log("main result : " , result[0]);

        await conn.commit();
        conn.release();

        return result[0];
        
    } catch (err) {
        await conn.rollback();
        conn.release();
        console.log(err);
        throw err;
    }
};

module.exports = FetchOneProduct;
