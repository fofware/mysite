'use strict'
const table = require('../helpers/db')
const artText = new table({table:'articulosText'})

function list(rows, page=1) {
	return artText.qry({rows,page})
}

module.exports = {
	list
}