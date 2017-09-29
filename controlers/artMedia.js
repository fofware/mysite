'use strict'
const table = require('./db')
const artMedia = new table({table:'articulosMedia'})

function list(rows, page=1) {
	return artMedia.qry({rows,page})
}

module.exports = {
	list
}