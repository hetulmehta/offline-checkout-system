const Database = require("../services/DBConnect");

const listcart = async (userID) => {
    console.log(userID);
    try {
        const query = `
        SELECT * FROM Cart INNER JOIN Product ON Product.eancode=Cart.Eancode WHERE Cart.userID=?
        `;
        const result = await Database.query(query,[userID]);
        return result;

    } catch (err) {
       console.log(err);
       throw err;
    }
};

module.exports = listcart;