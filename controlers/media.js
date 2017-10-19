const extend = require('extend')
const table = require('../helpers/db')
const media = new table({table:'media'});
const poster = new table({table:'poster'})
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
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			next()
		})
		.catch( (err) => {
			res.status(err.status).send(err);
		})
}

function add( req, res, next ) {};

function update( req, res, next ) {};

function del( req, res, next ) {
	media.del({where:`\`id\`=${req.params.id}`})
	.then( (respuesta) => {
		res.status(respuesta.status).send(respuesta);
	})
	.catch( (err) => {
		res.status(err.status).send(err);
	})
};
//
function list ( req, res, next ) {
	const obj = {
//		columns:"ps.data as poster, c.*",
		from: "(SELECT * from media where not EXISTS (select `poster`.`mediaid` from `poster` where `poster`.`mediaid`=`media`.`id`)) c",
//		join: "LEFT JOIN poster AS ps ON (ps.order = 0 and ps.to=c.id)",
		rows:(req.params.rows || media.rows),
		page:(req.params.page || media.page)
	}
	media.qry(obj)
		.then( (respuesta) => {
			respuesta.data.rows.map((row, ind) =>{
//				console.log(row)
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

			})
			req.mydata = extend(true,{}, req.mydata, {respuesta});
			return new Promise((res,reject) => {
				let sequence = Promise.resolve();
				respuesta.data.rows.map((row, ind) =>{
					if (row.video || row.audio){
						const postObj = {
							columns: 'IF(`ps`.`data` IS NULL, `md`.`data`, `ps`.`data`) as data',
							from: "`poster` as `ps`",
							join: "LEFT JOIN `media` AS `md` ON( `md`.`id` = `ps`.`mediaid`)",
							where: `\`ps\`.\`to\`='${row.id}'`
						}
						sequence = sequence.then( () => {
							return poster.qry(postObj)
						})
						.then((posterData) =>{
							console.log(posterData.data.rows)
							req.mydata.respuesta.data.rows[ind].posters = posterData.data.rows;
						})
						.catch((err) => console.log(err))
					}
				})
				res(sequence);
				reject({ status:500, message:`Poster Error`});
			});
		})
		.then ((respuesta) => {
			console.log(req.mydata);
			next()
		})
		.catch( (respuesta) => {
			req.mydata = extend(true,{}, req.mydata, {respuesta});
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
function video_list(rows, page=0) {
	return media.qry({rows,page,where:"`type` LIKE 'video%'"});
}
function image_list(rows,page=1) {
	return media.qry({rows,page,where:"`type` LIKE 'image%'"});
}
module.exports = {
	add
	,update
	,del
	,get
	,list
	,user
	,video_list
	,image_list
}