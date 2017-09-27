'use strict'

const express 		= require('express');
//const productCtrl = require('../controlers/product');
//const userCtrl 		= require('../controlers/user');
//const isAuth			= require('../middlewares/auth');

const api				= express.Router();

/*
api.get('/product', isAuth, productCtrl.list );
api.get('/product/:productId', productCtrl.get );
api.post('/product', productCtrl.add );
api.put('/product/:productId', productCtrl.update );
api.delete('/product/:productId', productCtrl.del );
api.post('/signup', userCtrl.signUp);
//api.post('/signin', userCtrl.signIn);
api.post('/signin', userCtrl.logIn, );
api.get('/private', isAuth, ( req, res ) => {
	res.status(200).send({message: 'Tiene acceso'});
});
*/
module.exports = api;