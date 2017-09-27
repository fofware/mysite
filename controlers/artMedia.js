'use strict'
const db = require('./db')

function connect() {
	return new Promise( (resolve, reject) => {
		db.connect( (err) => {
			if ( err ) reject({ status:500, message:`Error ${err.stack}`,data:err});
			resolve({status: 200, message:"Logueo Exitoso"})
		});
	});
}
function list(){
	return connect()
		.then((response) => {
			return new Promise ((resolve,reject) => {
				db.query('SELECT * FROM `articulosMedia` limit 10', (error, result, field) => {
					if(error) reject({ status:500, message:`Error ${err.stack}`,data:err});
					resolve({status: 200, message:"Logueo Exitoso", data: result})
				});
			})
		}).catch( (err) => {
			console.error(err);
		})
}

module.exports = {
	list
}