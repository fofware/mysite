'use strict'

const tokenServive = require('../service/token');

function isAuth ( req, res, next ) {
	console.log("Pasa por auth");
	next();
/*
	if (!req.headers.autorization) {
		return res.status(403).send({message: 'No tiene autorizacion'});
	};
	const token = req.headers.autorization.split( ' ' )[1];
	tokenServive.decodeToken(token)
		.then(response => {
			req.user = response;
			next();
		})
		.catch(response => {
			res.status(response.status).send({message: response.message});
		})
	*/
};

module.exports = isAuth;