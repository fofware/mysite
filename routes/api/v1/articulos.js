'use script'
const express 	= require('express');
const isAuth		= require('../../../middlewares/auth');
const articulosCtrl = require('../../../controlers/articulos');

const articulosRoute	= express.Router();
//para acceder a registro especifico
articulosRoute.get('/articulos', isAuth, articulosCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('presion',eq.respuesta));
articulosRoute.get('/api/v1/articulos', isAuth, articulosCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
articulosRoute.get('/api/jqgrid/v1/articulos', isAuth, articulosCtrl.list, (req,res) => {
	let jqGriddata = {
		page: req.mydata.respuesta.data.page,
		total: req.mydata.respuesta.data.lastPage,
		records: req.mydata.respuesta.data.tableRowsCount,
		rows: []
	}
	req.mydata.respuesta.data.rows.map((row) => {
		const newRow = {id:row.id,cell:[row.id,row.fecha,row.alta,row.baja,row.pulso,row.description,row.userid]}
		jqGriddata.rows.push(newRow)
	})
	res.status(req.mydata.respuesta.status).send(jqGriddata)
});

module.exports = articulosRoute;
