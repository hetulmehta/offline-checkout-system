const Database = require("../services/DBConnect");

const FetchAllProduct = async () => {
    try {
        const query = `
        SELECT * FROM Levyne.Product
        `;
        const result = await Database.query(query);
        return result;

    } catch (err) {
       console.log(err);
       throw err;
    }
};

module.exports = FetchAllProduct;
