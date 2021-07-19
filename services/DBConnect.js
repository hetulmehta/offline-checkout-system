const mariadb = require("mariadb");

global.MySqlPool = mariadb.createPool({
    host: process.env.MySqlHost,
    user: process.env.MySqlUser,
    password: process.env.MySqlPassword,
    database: process.env.MySqlDB,
});

module.exports = global.MySqlPool;
