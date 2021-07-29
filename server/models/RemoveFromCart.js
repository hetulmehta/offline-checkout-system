const Database = require("../services/DBConnect");

const RemoveFromCart = async (userID, eancode) => {
    const conn = await Database.getConnection();
    try {
        await conn.beginTransaction();

        const query = `
            SELECT * FROM Cart
            WHERE Eancode=? and userID = ?
        `;

        const result = await conn.query(query, [eancode, userID]);

        if (!result[0]) {
            throw new Error();
        }

        const query1 = `
        DELETE FROM Cart WHERE Eancode = ? AND userID = ?
        `;
        await conn.query(query1, [eancode, userID]);

        await conn.commit();
        await conn.release();

        return;
    } catch (err) {
        await conn.rollback();
        console.log(err);
        throw err;
    }
};

module.exports = RemoveFromCart;
