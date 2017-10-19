'use script'
const express 	= require('express');
const isAuth		= require('../../../middlewares/auth');
const presionCtrl = require('../../../controlers/presion');

const presionRoute	= express.Router();
//para acceder a registro especifico
//presionRoute.get('/presion', isAuth, presionCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('presion',req.mydata.respuesta));
presionRoute.get('/presion', isAuth, (req, res) => res.status(200).render('presion'));
presionRoute.get('/api/v1/presion', isAuth, presionCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
presionRoute.get('/api/jqgrid/v1/presion', isAuth, presionCtrl.list, (req,res) => {
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

presionRoute.post('/presion/', isAuth, presionCtrl.add);
presionRoute.get('/presion/:id', isAuth, presionCtrl.get);
presionRoute.delete('/presion/:id', isAuth, presionCtrl.del);
presionRoute.post('/presion/:id', isAuth, presionCtrl.update);

//lista de registros
presionRoute.get('/presion/page/:page', isAuth, presionCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('presion',req.mydata.respuesta));
presionRoute.get('/presion/page/:page/:rows', isAuth, presionCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('presion',req.mydata.respuesta));
//presionRoute.get('/api/presion/page/:page/:rows', isAuth, presionCtrl.listpage, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
presionRoute.get('/presion/user/:userId', isAuth, presionCtrl.user );

module.exports = presionRoute;
