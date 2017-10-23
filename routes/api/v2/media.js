'use script'

const express 	= require('express');
const isAuth		= require('../../../middlewares/auth');
const mediaCtrl = require('../../../controlers/media-sequelize');

const mediaRoute	= express.Router();

mediaRoute.param('id', (req, res, next, id) => {
	console.log('Recibio id: ', id);
	next();
})
mediaRoute.param('page', (req, res, next, page) => {
	console.log('Recibio page: ', page);
	if (parseInt(page,10) < 1) page = 1;
	if (!req.params) req.params = {};
	req.params.page
	next();
})
mediaRoute.param('rows', (req, res, next, rows) => {
	console.log('Recibio rows: ', rows);
	next();
})

//para acceder a registro especifico
mediaRoute.get('/api/v2/media', isAuth, mediaCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
mediaRoute.get('/api/v2/media/page/:page', isAuth, mediaCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
module.exports = mediaRoute;
