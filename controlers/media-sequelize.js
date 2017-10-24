'use strict';
const extend = require('extend')
const sequelize = require('sequelize');
const seqService = require('../service/sql-service')

const mediaData = {
	list: function( req, res, next ) {
		const Op = sequelize.Op;
		const Media = seqService.getModelByName('media');
		const Poster = seqService.getModelByName('mediaposter');
		const cosa = seqService.getModelByName('cosa');
		let qryObj = {
//			raw: true,
			offset: 0,
			limit: 24
		}
//		if(req.mydata.page) 
			qryObj.offset = 1584;
//		if (req.mydata.limit)
//			qryObj.limit = 50;
//			qryObj.include = [{	model: Poster, as: 'posters'	}];
			qryObj.include = [{ association: 'posters', attributes: ['data'] }];
			qryObj.where = { type: { [Op.like]: 'video%'}}
//			seqService.sequelize.query('SELECT * from media where not EXISTS (select `mediaposter`.`id_data` from `mediaposter` where `mediaposter`.`id_data`=`media`.`id`) limit 24',{ model: Media})
//		.then( (data) => {
//			console.log(data);
//		})

		Media.findAll(qryObj).then ( (response) => {
			let data = {}
//			data.rows = JSON.parse(JSON.stringify(response));
			data.rows = response;
//			console.log(data.rows)

			data.rows.map((row,idx) => {
				if(row.thumb) data.rows[idx]['thumb'] = ''; //row.thumb.toString('utf8');
				if(row.data)  data.rows[idx]['data'] = row.data.toString('utf8');
			})
			req.mydata = extend(true,{}, req.mydata, {respuesta: {status: 200, message:"Query Exitoso", data }});
			next();
		} )
	}
}
module.exports = mediaData;
