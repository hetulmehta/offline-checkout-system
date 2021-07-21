const Database = require("../services/DBConnect");

const FetchOneProduct = async (eancode) => {
    try {
        const query = `
            SELECT * FROM Product
            WHERE eancode=? and isaddedtocart=0
        `;

        const result = await Database.query(query, eancode);
        return result;
        
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = FetchOneProduct;
