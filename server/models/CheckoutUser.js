const Database = require("../services/DBConnect");

const CheckoutUser = async (userId) => {
    const conn = await Database.getConnection();

    try {
        await conn.beginTransaction();

        const fetchcart = `
            SELECT Eancode FROM Cart
            WHERE userID = ?
        `;

        const result = await conn.query(fetchcart, [userId]);

        const deleteCart = `
            DELETE FROM Cart
            WHERE userID=?
        `;

        const updateInventory = `
            UPDATE Product
            SET quantity = quantity - 1
            WHERE eancode = ?;
        `;

        await conn.query(deleteCart, [userId]);

        result.forEach(async (element) => {
            await conn.query(updateInventory, [element.Eancode]);
        });

        await conn.commit();
        await conn.release();

        // const cartItems = await
    } catch (err) {
        await conn.rollback();

        console.log(err);
        throw err;
    }
};

module.exports = CheckoutUser;
