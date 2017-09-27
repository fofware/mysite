'use strict'

const express 		= require('express');
//const isAuth			= require('../middlewares/auth');
//const userCtrl 		= require('../controlers/user');

const frontend	= express.Router();

frontend.get("/", (req, res) => res.status(200).render('index'));
frontend.get("/login", (req, res) => res.status(200).render('login'));
/*
frontend.post("/login", (req, res) => {
	userCtrl.logIn(req,res)
		.then ((response) => {
			res.status(response.status).render('index',response)
		})
		.catch ((err) => {
			console.log(err);
		})
//	console.log(req.body)
//	res.status(200).render('index');
});
*/
frontend.get("/register", (req, res) => res.status(200).render('register'));

module.exports = frontend;
