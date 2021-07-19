const express = require("express");
const app = express();
const { NotFoundError, ClientError } = require("./Error");
const FetchOneProduct = require("./models/FetchProducts");

app.get("/:eancode", async (req, res) => {
    const result = await FetchOneProduct(req.params.eancode);

    return res.json({
        success: true,
        data: result,
    });
});

module.exports = app;
