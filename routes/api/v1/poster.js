const express 	= require('express');
const isAuth		= require('../../../middlewares/auth');
const posterCtrl = require('../../../controlers/poster');
const toGrid			= require('../../../helpers/datatogrid');

const posterRoute	= express.Router();

posterRoute.param('page', (req, res, next, page) => {
	console.log('Recibio page: ', page);
	if (parseInt(page,10) < 1) page = 1;
	if (!req.params) req.params = {};
	req.params.page = page;
	next();
})

posterRoute.param('to', (req, res, next, to) => {
	console.log('Recibio to: ', to);
	to = parseInt(to,10);
	if ( to < 1) page = 1;
	if (!req.params) req.params = {};
	req.params.to = to;
	next();
})

//http://172.31.2.2:8088/api/v1/poster/jqgrid/page/1?_search=false&nd=1508358091472&rows=10&page=1&sidx=id&sord=desc
//let cols = ['id','to','order','mediaid','name','type','size','width','height','data_type','data','userid','username','time'];
//para acceder a registro especifico
posterRoute.get('/api/v1/poster/page/:page', isAuth, posterCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
posterRoute.get('/api/v1/poster/jqgrid/page/:page', isAuth, posterCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(toGrid(req.mydata.respuesta)));
posterRoute.get('/api/v1/poster/:to', isAuth, posterCtrl.toMediaGet, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));

posterRoute.get('/api/v1/poster/jqgrid/:to', isAuth, posterCtrl.toMediaGet, (req,res) => res.status(req.mydata.respuesta.status).send( toGrid(req.mydata.respuesta) ));

posterRoute.post('/api/v1/poster/jqgrid',isAuth, posterCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(toGrid(req.mydata.respuesta)));
posterRoute.get('/api/v1/poster/jqgrid', isAuth, posterCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send( toGrid(req.mydata.respuesta) ));
module.exports = posterRoute;
