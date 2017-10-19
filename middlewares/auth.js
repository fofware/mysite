const extend 				= require('extend')
const tokenServive = require('../service/token');

function isAuth ( req, res, next ) {
	//if(!req.mydata) req.mydata = {};
	const user = {name:'pepe'}
	req.mydata = extend(true,{},req.mydata,{user})
	console.log(req.mydata)
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