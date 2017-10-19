'use strict'
const table = require('../helpers/db')
const presion = new table({table:'articulos'});
const fields =`"id","fecha","alta","baja","pulso","userid","description"`

/** funciones para registro unico **/
function get( req, res, next ) {
	presion.qry({where:`\`id\`=${req.params.id}`})
		.then( (respuesta) => {
			res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
}

function add( req, res, next ) {};

function update( req, res, next ) {};

function del( req, res, next ) {
	presion.del({where:`\`id\`=${req.params.id}`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
//
function list ( req, res, next ) {
	const obj = {
		rows:(req.params.rows || presion.rows),
		page:(req.params.page || presion.page)
	}
	presion.qry(obj)
	.then( (respuesta) => {
		req.mydata.respuesta = respuesta
		next()
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
/*******************************************************************/
/*  las de arriba son igual para todos                             */
/*******************************************************************/
function user ( req, res, next ){
	const columns = `"id","fecha","alta","baja","pulso","userid","description"`
	presion.qry({columns, where:`\`userid\`='${req.params.userId}'`})
		.then( (response) => {
			res.status(response.status).send(response);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
}
module.exports = {
	add
	,update
	,del
	,get
	,list
	,user
}