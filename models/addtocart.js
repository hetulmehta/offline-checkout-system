const { NotFoundError, ClientError } = require("../Error");
const Database = require("../services/DBConnect");

const addtocart = async (userID,eancode) => {
    try {
        const query = `
            INSERT INTO Cart("userID","eancode") VALUES(?,?)
        `;
        const result = await Database.query(query,[userID,eancode]);
        return result;

    } catch (err) {
        console.log(err);
    }
};

module.exports = addtocart;