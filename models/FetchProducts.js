const { NotFoundError, ClientError } = require("../Error");
const Database = require("../services/DBConnect");

const FetchOneProduct = async (eancode) => {
    try {
        const query = `
            SELECT * FROM Product
            WHERE eancode=?
        `;

        const result = await Database.query(query, eancode);

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports = FetchOneProduct;
