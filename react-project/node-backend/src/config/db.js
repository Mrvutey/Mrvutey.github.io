// const mysql = require("mysql");
// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password: "",
//     database:"g7_db",
//     port:5306,//3306,
// })
// module.exports = db;

const mysql = require("mysql2/promise");
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "",
    database:"g7_db",
    port:3306,
    connectionLimit:100,
    namedPlaceholders:true
})
module.exports = db;