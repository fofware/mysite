'use strict'
const express 		= require('express');
const isAuth			= require('../middlewares/auth');

const artMediaCtrl	= require( '../controlers/artMedia');

const artMedia	= express.Router();
artMedia.get('/artMedia', artMediaCtrl.list);
artMedia.get('/artMedia/:artmediaId', artMediaCtrl.get);
artMedia.get('/artMedia/articulo/:artmediaArticulo', artMediaCtrl.articulo);
artMedia.get('/artMedia/page/:rows/:page', artMediaCtrl.listpage);
artMedia.get('/artMedia/type/:artmediaType', artMediaCtrl.type);
artMedia.get('/artMedia/titulo/:artmediaTitulo', artMediaCtrl.titulo);

module.exports = artMedia;