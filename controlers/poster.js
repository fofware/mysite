const extend = require('extend');
const table = require('../helpers/db');
const poster = new table({table:'poster'});

function get ( req, res, next ){
	poster.qry({where: `\`id\`='${req.params.posterId}'`})
		.then( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
		.catch( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
};
function toMediaGet ( req, res, next ){
	poster.qry({where: `\`to\`='${req.params.to}'`})
		.then( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
		.catch( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
};
function list ( req, res, next ) {
	for(const key in req.query) {
		req.params[key] = req.query[key];
	}
	for(const key in req.body) {
		req.params[key] = req.body[key];
	}
	// Detalle de info enviada por jqGrid
// _search=false&nd=1508250156666&rows=10&page=1&sidx=id&sord=desc/	

// Detalle devolución para jqGrid
// Tag			Description
// total		total pages for the query
// page			current page of the query
// records	total number of records for the query
// rows			an array that contains the actual data
// id				the unique id of the row
// cell			an array that contains the data for a row
let obj = {
			columns:"`ps`.`id`, `ps`.`to`, `ps`.`order`, `ps`.`mediaid`, `ps`.`name`, `ps`.`type`, `ps`.`size`, `ps`.`width`, `ps`.`height`, `ps`.`data_type`, IF(`ps`.`data` IS NULL, `md`.`data`, `ps`.`data`) `data`, `ps`.`userid`, `ps`.`username`, `ps`.`time`",
			from: "poster as ps",
			join: "LEFT JOIN media AS md ON( md.id = ps.mediaid)",
			rows:(req.params.rows || poster.rows),
			page:(req.params.page || poster.page),
		}
	if(req.params.sidx) obj.order = req.params.sidx + ' ' + (req.params.sord || '');
	poster.qry(obj)
		.then( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
		.catch( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
};
function media ( req, res, next ) {
	poster.qry({where: `\`to\`='${req.params.posterArticulo}'`})
		.then( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
		.catch( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
		})
};
function add ( req, res, next ) {
	poster.qry({where: `\`titulo\` LIKE '${req.params.posterTitulo}%'`})
	.then( (respuesta) => {
		req.mydata = extend(true,{}, req.mydata, {respuesta});
		next()
	})
	.catch( (respuesta) => {
		req.mydata = extend(true,{}, req.mydata, {respuesta});
		next()
	})
};
module.exports = {
//	route
	get
	,list
	,toMediaGet
};
