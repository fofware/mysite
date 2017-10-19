'use script'

const express 	= require('express');
const isAuth		= require('../middlewares/auth');
const mediaCtrl = require('../controlers/media');

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
mediaRoute.get('/api/v1/media', isAuth, mediaCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
mediaRoute.get('/media/page/:page', isAuth, mediaCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('media_galery',req.mydata));

mediaRoute.get('/media/:id', isAuth, mediaCtrl.get);
mediaRoute.put('/media/:id', isAuth, mediaCtrl.add);
mediaRoute.delete('/media/:id', isAuth, mediaCtrl.del);
mediaRoute.post('/media/:id', isAuth, mediaCtrl.update);
//lista de registros
mediaRoute.get('/media', isAuth, mediaCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('media_galery',req.mydata.respuesta));
mediaRoute.get('/api/v1/media/page/:page', isAuth, mediaCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
//mediaRoute.get('/media/page/:page/:rows', isAuth, mediaCtrl.list, (req, res) => res.status(req.mydata.respuesta.status).render('media_galery',req.mydata.respuesta));
//mediaRoute.get('/api/media/page/:page/:rows', isAuth, mediaCtrl.list, (req,res) => res.status(req.mydata.respuesta.status).send(req.mydata.respuesta));
//mediaRoute.get('/media/user/:userId', isAuth, mediaCtrl.user );

module.exports = mediaRoute;
