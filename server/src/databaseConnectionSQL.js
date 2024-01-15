const mysql = require('mysql2/promise');

const dbConfig = {
	host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	multipleStatements: false,
	namedPlaceholders: true
	
};

console.log("USER FOR MYSQL: " +  process.env.MYSQL_USER)

var mySQLDB = mysql.createPool(dbConfig);

module.exports = mySQLDB;