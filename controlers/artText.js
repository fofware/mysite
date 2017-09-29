'use strict'
const table = require('./db')
const artText = new table({table:'articulosText'})

function list(rows, page=1) {
	return artText.qry({rows,page})
}

module.exports = {
	list
}