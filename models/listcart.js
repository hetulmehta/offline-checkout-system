const { NotFoundError, ClientError } = require("../Error");
const Database = require("../services/DBConnect");

const listcart = async (userID) => {
    try {
        const query = `
        SELECT * FROM Levyne.Cart INNER JOIN Product ON Product.eancode=Cart.eancode WHERE Cart.userID=?
        `;
        const result = await Database.query(query,userID);
        return result;

    } catch (err) {
        console.log(err);
    }
};

module.exports = listcart;