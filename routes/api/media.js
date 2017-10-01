'use script'

const express 	= require('express');
const isAuth		= require('../../middlewares/auth');
const mediaCtrl = require('../../controlers/media');

const mediaRoute	= express.Router();

mediaRoute.get('/media', isAuth, mediaCtrl.list );

module.exports = mediaRoute;
