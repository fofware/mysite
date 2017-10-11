'use script'

const express 	= require('express');
const isAuth		= require('../middlewares/auth');
const mediaCtrl = require('../controlers/media');

const mediaRoute	= express.Router();
//para acceder a registro especifico
mediaRoute.get('/media/:id', isAuth, mediaCtrl.get);
mediaRoute.put('/media/:id', isAuth, mediaCtrl.insert);
mediaRoute.delete('/media/:id', isAuth, mediaCtrl.del);
mediaRoute.post('/media/:id', isAuth, mediaCtrl.update);
//lista de registros
mediaRoute.get('/media', isAuth, mediaCtrl.list, (req, res) => res.status(req.respuesta.status).render('media',req.respuesta));
mediaRoute.get('/api/media', isAuth, mediaCtrl.list, (req,res) => res.status(req.respuesta.status).send(req.respuesta));
mediaRoute.get('/media/page/:page', isAuth, mediaCtrl.list, (req, res) => res.status(req.respuesta.status).render('media',req.respuesta));
mediaRoute.get('/media/page/:page/:rows', isAuth, mediaCtrl.list, (req, res) => res.status(req.respuesta.status).render('media',req.respuesta));
//mediaRoute.get('/api/media/page/:page/:rows', isAuth, mediaCtrl.listpage, (req,res) => res.status(req.respuesta.status).send(req.respuesta));
mediaRoute.get('/media/user/:userId', isAuth, mediaCtrl.user );

module.exports = mediaRoute;
