'use strict'
const mysql			= require('mysql');
const db  = mysql.createPool({
	host     : '172.31.2.2',
	user     : 'root',
	password : 'pirulo',
	database : 'fofware',
	connectionLimit: 100
});
class table {
  constructor (obj){
    this.table = obj.table;
		this.columns = obj.columns || '*';
		this.rows = obj.rows || 20;
		this.page = obj.page || 1;
		this.noLimit = false;
		this.limit = `${(this.page-1)*this.rows}, ${this.rows}`;
	}
	countRows(){
		let params = {
			table: this.table,
			columns: 'count(*) count'
		}
		return 1000;		
	}
	select(obj){
		let strQry = `SELECT * FROM \`${this.table}\``
		if (obj.rows){
			if (obj.page)
				obj.limit = `${(obj.page-1)*obj.rows}, ${obj.rows}`;
			else
				obj.limit = `${obj.rows}`;
		}
		if(obj.columns) strQry = strQry.replace("*",obj.columns);
		if(obj.where) strQry += ` WHERE ${obj.where}`;
		if(obj.order) strQry += ` ORDER BY ${obj.order}`;
		if(obj.limit) strQry += ` LIMIT ${obj.limit}`;
		return strQry;
	}
	connect() {
		return new Promise( (resolve, reject) => {
			db.getConnection( (err, connection) => {
				if ( err )
					reject({ status:100, message:`Connect Error: ${err.code}`,data:err});
				resolve(connection)
			});
		});
	}
	findById(id){
		return new Promise( (resolve, reject) => {

		})
	}
	qry(params){
		console.log(params)
		const strSQL = this.select(params);
		console.log(strSQL)
		return new Promise ((resolve,reject) => {
			this.connect()
			.then((con) => {
				con.query(strSQL, (error, results, fields) => {
					con.release();
					if(error) reject({ status:500, message:`Query Error: ${error.sqlMessage}`,data:error});
					if(!results[0]) reject({ status:404, message: `No se encontraron resultados para el\nQuery: ${strSQL}`})
					const data = JSON.parse(JSON.stringify(results));
					resolve({status: 200, message:"Query Exitoso", data: data })
				});
			})
			.catch((err) => {
				reject(err)
			})
		})
	}
}
/*
function buildQry(params){
	let strQry = `SELECT * FROM \`${params.table}\``
	if(params.columns) strQry = strQry.replace("*",params.columns);
	if(params.where) strQry += ` WHERE ${params.where}`;
	if(params.order) strQry += ` ORDER BY ${params.order}`;
	if(params.limit) strQry += ` LIMIT ${params.limit}`;
	return strQry;
}
function connect() {
	return new Promise( (resolve, reject) => {
		db.getConnection( (err, connection) => {
			if ( err )
				reject({ status:100, message:`Connect Error: ${err.code}`,data:err});
			resolve(connection)
		});
	});
}
function qry(params){
	console.log(params)
	let strSQL = buildQry(params);
	console.log(strSQL)
	return new Promise ((resolve,reject) => {
		connect()
		.then( (con) => {
			con.query(strSQL, (error, results, fields) => {
				con.release();
				if(error) reject({ status:500, message:`Query Error: ${error.sqlMessage}`,data:error});
				if(!results) reject({ status:404, message: `No se encontraron resultados para el\nQuery: ${strSQL}`})
				const data = JSON.parse(JSON.stringify(results));
				resolve({status: 200, message:"Query Exitoso", data: data })
			});
		})
		.catch( (err) => {
			reject(err)
		} )
	})
}
function list(params) {
	return qry(buildQry);
}
function get(table, id, id_name ='id') {
	let strQry = `SELECT * FROM \`${table}\` WHERE \`${id_name}\`='${id}'`
	return qry(strQry);
}
*/
module.exports = table