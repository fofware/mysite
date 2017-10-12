'use strict'
const mysql			= require('mysql');
const db  = mysql.createPool({
	host     : '127.0.0.1',
	user     : 'www-data',
	database : 'fofware',
	insecureAuth: true,
	connectionLimit: 100
});

class table {
  constructor (obj){
    this.table = obj.table;
		this.columns = obj.columns || '*';
		this.rows = obj.rows || 24;
		this.page = obj.page || 1;
		this.showAll = false;
	}
	makeQry(obj = {}){
		let strQry = `SELECT * FROM \`${this.table}\``
		if (obj.from) strQry = `SELECT * FROM ${obj.from}`;
		if(obj.join || this.join) strQry += ` ${obj.join || this.join}`
		if(obj.columns) strQry = strQry.replace("*",obj.columns);
		if(obj.where) strQry += ` WHERE ${obj.where}`;
		if(obj.order) strQry += ` ORDER BY ${obj.order}`;
// faltan cosas como join, having, etc
		if(!(obj.showAll || this.showAll))
			strQry += ` LIMIT ${((obj.page || this.page)-1)*(obj.rows || this.rows)}, ${(obj.rows || this.rows)}`;
		return strQry;
	}
	connect() {
		return new Promise( (resolve, reject) => {
			db.getConnection( (err, connection) => {
				if ( err )
					reject({ status:500, message:`Connect Error: ${err.code}`,data:err});
				resolve(connection)
			});
		});
	}
	findById(id){
		return new Promise( (resolve, reject) => {

		})
	}
	countRows(strSQL){
		return new Promise ((resolve,reject) => {
			this.connect()
			.then((con) => {
				let strCnt = `SELECT count(*) count FROM (${strSQL}`;
				let l = strCnt.indexOf(' LIMIT');
				if(l > 0)	strCnt = strCnt.substr(0,l)
				strCnt += ') as c';
//				console.log(strCnt);
				con.query(strCnt, (error, results, fields) => {
					con.release();
					if(error) reject({ status:500, message:`Query Error: ${error.sqlMessage}`,data:error});
					if(!results[0]) reject({ status:404, message: `No se encontraron resultados para el\nQuery: ${strSQL}`})
					const tableRows = JSON.parse(JSON.stringify(results[0]));
					resolve({status: 200, message:"Query Exitoso", tableRows })
				})
			})
			.catch(reject)
		})
	}
	/*
	qryCount(params={}){
		return new Promise ((resolve,reject) => {
			this.countRows()
				.then( (countObj) => {
					this.qry(params)
						.then( (qryObject) => {
							qryObject.data.tableRowsCount = countObj.tableRows.count
							let last = parseInt(countObj.tableRows.count / qryObject.data.rowsByPage)
							if(qryObject.data.page < last){
								qryObject.data.lastPage = last;
								qryObject.data.nextPage = qryObject.data.page + 1
							}
							if(qryObject.data.page > 1){
								qryObject.data.previusPage = qryObject.data.page - 1
								qryObject.data.firstPage = 1
							}
							resolve(qryObject)
						})
						.catch(reject)
				})
				.catch(reject)
		})
	}
	*/
	qry(params={}){
		const strSQL = this.makeQry(params);
		console.log(strSQL)
		return new Promise ((resolve,reject) => {
			this.countRows(strSQL)
				.then( ( countObj ) => {
					this.connect()
						.then((con) => {
							const qryObj = {
								sql: strSQL
								,typeCast: function (field, next) {
									if(field.type=='LONGBLOB' || field.type=='BLOB' ){ 
										return field.string();
									}
									return next();
								}
							}
							con.query(qryObj, (error, results, fields) => {
								con.release();
								if(error) reject({ status:500, message:`Query Error: ${error.sqlMessage}`,data:error});
								if(!results[0]) reject({ status:404, message: `No se encontraron resultados para el\nQuery: ${strSQL}`})
								let data = {};
								data.rows = JSON.parse(JSON.stringify(results));
								if (!(params.showAll || this.showAll)){
									data.page = parseInt((params.page || this.page));
									data.rowsByPage = params.rows || this.rows
									data.rowIni = ((data.page-1)*data.rowsByPage)+1
									data.rowsShow = data.rows.length
								}
								data.tableRowsCount = countObj.tableRows.count
								let addpage = 0
								if((countObj.tableRows.count % data.rowsByPage) > 0) addpage = 1;
								let last = parseInt(countObj.tableRows.count / data.rowsByPage)+addpage
								if(data.page < last){
									data.lastPage = last;
									data.nextPage = data.page + 1
								}
								if(data.page > 1){
									data.previusPage = data.page - 1
									data.firstPage = 1
								}
								resolve({status: 200, message:"Query Exitoso", data })
							});
					})
				})
			.catch((err) => {
				reject(err)
			})
		})
	}
	del(params){
		strSQL
		
	}
}
module.exports = table