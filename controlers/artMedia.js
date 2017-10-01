'use strict'
const table = require('../helpers/db')
/*
const artMedia = new table({table:'articulosMedia'})
const artMedia_root = 'artMedia'
const route = {
	frontend: {
		get:{
			method: 'get',
			path: `/${artMedia_root}/:artmediaId`
		},
		list:{
			method: 'get',
			path: `/${artMedia_root}`
		},
		articulo: {
			method: 'get',
			path: `/${artMedia_root}/articulo/:artmediaArticulo`
		}
	}
}
*/
function get ( req, res, next ){
	artMedia.qry({where: `\`id\`='${req.params.artmediaId}'`})
		.then( (response) => {
			res.status(response.status).send(response);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};
function list ( req, res, next ) {
	artMedia.qry({rows:10,page:5})
		.then( (respuesta) => {
			res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};
function listpage ( req, res, next ) {
	artMedia.qry({rows:req.params.rows,page:req.params.page})
		.then( (respuesta) => {
			res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};
function articulo ( req, res, next ) {
	artMedia.qry({where: `\`articulo\`='${req.params.artmediaArticulo}'`})
		.then( (respuesta) => {
			res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};


function type ( req, res, next ) {
	artMedia.qry({where: `\`type\` LIKE '${req.params.artmediaType}%'`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
function titulo ( req, res, next ) {
	artMedia.qry({where: `\`titulo\` LIKE '${req.params.artmediaTitulo}%'`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
function add ( req, res, next ) {
	artMedia.qry({where: `\`titulo\` LIKE '${req.params.artmediaTitulo}%'`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};

/*
function add ( req, res, next ) {
	console.log('POST');
	console.log(req.body);
	let product = new Product();
	product.name = req.body.name;
	product.picture = req.body.picture;
	product.price = req.body.price;
	product.category = req.body.category;
	product.description = req.body.description;
	product.save((err, productStored) => {
		if (err) return res.status(500).send({mesagge: `Error al grabar el producto ${err} `});
		res.status(201).send({producto: productStored});
	});

};

function update ( req, res, next ) {
	let productId = req.params.productId;
	let update = req.body;
	console.log (update);
	Product.findByIdAndUpdate(productId, update, ( err, productUpadated ) =>{
		if ( err ) return res.status(500).send({message: `Error al modificar el producto ${productId}. Erros: ${err}`});
		res.status(200).send({message: `El producto ${productId} se ha modificado exitosamente`, productUpadated});
	});

};

function del ( req, res, next ) {
	let productId = req.params.productId;
	Product.findById(productId, (err, producto) =>{
		if ( err ) return res.status(500).send({message: `Error al buscar el producto para borrarlo. Erros: ${err}`});
		if (!producto) return res.status(404).send({message:`El producto id: ${productId} no Existe`});
		producto.remove(err => {
			if ( err ) return res.status(500).send({message: `Error al borrar el Producto ${productId}. Erros: ${err}`});
			res.status(200).send({message: 'Se ha borrado el producto', producto});
		});
	});

};
*/
module.exports = {
//	route
	get
	,list
	,listpage
	,articulo
	,titulo
	,type
	/*
	,add
	,update
	,del
*/
};
