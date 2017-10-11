'use strict'

const table = require('../helpers/db')
const media = new table({table:'media'});
const poster = new table({table:'poster'})
//media.join = "LEFT JOIN `poster` ON (`media`.`id`=`poster`.`to`)"
const fields =`
"id",
"date",
"categoria",
"name",
"type",
"size",
"width",
"height",
"duration",
"titulo",
"description",
"tags",
"idioma",
"clave",
"srcType",
"srcData",
"thumb_type",
"thumb",
"data_type",
"data",
"owner",
"group",
"adult",
"private",
"userid",
"username"`

/** funciones para registro unico **/
function get( req, res, next ) {
	media.qry({where:`\`id\`=${req.params.id}`})
		.then( (respuesta) => {
			res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
}
function insert( req, res, next ) {
	
};
function del( req, res, next ) {
	media.del({where:`\`id\`=${req.params.id}`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
function update( req, res, next ) {};
//
function findPoster(id) {
	return poster.qry({where:`\`to\`=${id}`})
}
function list ( req, res, next ) {
	media.qry({ where: "not EXISTS (select * from `poster` where `poster`.`mediaid`=`media`.`id`)", rows:(req.params.rows || media.rows),page:(req.params.page || media.page)})
		.then( (respuesta) => {
			try {
				respuesta.data.rows.map((row, ind) =>{
//					console.log(row)

					let tp = row.type.split('/')
					respuesta.data.rows[ind].responsiveRatio = "16by9"
					if( ( row.width / row.height ) == ( 4 / 3 ) )
						respuesta.data.rows[ind].responsiveRatio = "4by3"
					if(tp[0]=='video' && tp[1].indexOf('youtu')>-1){
							respuesta.data.rows[ind].youtube = 1;
							respuesta.data.rows[ind].responsiveRatio = "16by9"
					} else {
						respuesta.data.rows[ind][tp[0]] = 1;
					}
					if( respuesta.data.rows[ind].video || respuesta.data.rows[ind].audio ){
						findPoster(row.id)
							.then( (rspta ) => {
								respuesta.data.rows[ind].poster = rspta.data.rows
								console.log(respuesta.data.rows[ind])
//								console.log(rspta.data.rows)
							})
							.catch((err) => console.log(err))
					}
				});
				req.respuesta = respuesta;
//				console.log(respuesta)
				next()
			}
			catch(err){
				reject({ status:500, message:`Error: ${err}`});
			}
//				res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};
/*******************************************************************/
/*  las de arriba son igual para todos                             */
/*******************************************************************/
function user ( req, res, next ){
	const columns = `
	"id",
	"date",
	"categoria",
	"name",
	"type",
	"size",
	"width",
	"height",
	"duration",
	"titulo",
	"description",
	"tags",
	"idioma",
	"clave",
	"srcType",
	"srcData",
	"owner",
	"group",
	"adult",
	"private",
	"userid",
	"username"`
	media.qry({columns, where:`\`userid\`='${req.params.userId}'`})
		.then( (response) => {
			res.status(response.status).send(response);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
}
/*
function listpage ( req, res, next ) {
//	media.rows = req.params.rows;
//	media.page = req.params.page;
//	artMedia.qry({rows:req.params.rows,page:req.params.page})
const columns = "`id`,`date`,`categoria`,`name`,`type`,`size`,`width`,`height`,`duration`,`description`,`tags`,`idioma`,`clave`,`srcType`,`srcData`,`owner`,`group`,`adult`,`private`,`userid`,`username`";
media.qryCount({rows:req.params.rows,page:req.params.page})
		.then( (respuesta) => {
				respuesta.data.rows.map((row, index) =>{
					if(row.type.indexOf('image')>-1)
						respuesta.data.rows[index].image = 1;
					else
						if(row.type.indexOf('youtube')>0)
							respuesta.data.rows[index].youtube = 1;
						else
							respuesta.data.rows[index].video = 1;
				} );
				req.respuesta = respuesta;
				next()
//				res.status(respuesta.status).send(respuesta);
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
};
*/
function video_list(rows, page=0) {
	return media.qry({rows,page,where:"`type` LIKE 'video%'"});
}
function image_list(rows,page=1) {
	return media.qry({rows,page,where:"`type` LIKE 'image%'"});
}
module.exports = {
	get
	,insert
	,del
	,update
	,list
	,user
	,video_list
	,image_list
}