'use strict'

const table = require('./db')
const media = new table({table:'media'});

function list(rows, page=1) {
	return media.qry({rows,page})
}

function video_list(rows, page=0) {
	return media.qry({rows,page,where:"`type` LIKE 'video%'"});
}
function image_list(rows,page=1) {
	return media.qry({rows,page,where:"`type` LIKE 'image%'"});
}
function get(Id) {
	return media.qry({where:`\`id\`=${Id}`});
}
module.exports = {
	list
	,video_list
	,image_list
	,get
}