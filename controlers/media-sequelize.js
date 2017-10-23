'use strict';
const extend = require('extend')
const seqService = require('../service/sql-service')

const mediaData = {
	list: function( req, res, next ) {
		const Media = seqService.getModelByName('media');
		const poster = seqService.getModelByName('poster_new');
		const cosa = seqService.getModelByName('cosa');
		let qryObj = {
			raw: true
		}
		if(req.mydata.page) 
			qryObj.offset = 1584;
		if (req.mydata.limit)
			qryObj.limit = 24;
		qryObj.include = [
			{
				model: poster
//				,as: 'poster_new'
//				,Key: 'media_id'
//				,foreignKey : 'media_id'
//				,constraints: true
			}
		];
		Media.findAll(qryObj).then ( (response) => {
//			console.log(response);
			let data = {}
//			data.rows = JSON.parse(JSON.stringify(response));
			data.rows = response;
//			console.log(data.rows)

			data.rows.map((row,idx) => {
				if(row.thumb) data.rows[idx]['thumb'] = row.thumb.toString('utf8');
				if(row.data)  data.rows[idx]['data'] = row.data.toString('utf8');
			})
			req.mydata = extend(true,{}, req.mydata, {respuesta: {status: 200, message:"Query Exitoso", data }});
			next();
		} )
	}
}
module.exports = mediaData;
