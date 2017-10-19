const express 	= require('express');
const isAuth		= require('../../middlewares/auth');
const posterCtrl = require('../../controlers/poster');

const posterRoute	= express.Router();
posterRoute.get('/poster/grid', isAuth, (req, res) => res.status(200).render('poster',req.mydata));
module.exports = posterRoute;
