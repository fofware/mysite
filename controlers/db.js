'use strict'
const mysql			= require('mysql');
const db = mysql.createConnection({
	host     : '192.96.215.51',
	user     : 'root',
	password : 'pirulo',
	database : 'fofware'
});

module.exports = db;