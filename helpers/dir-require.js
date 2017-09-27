'use strict'
const fs		= require('fs');
const path	= require('path');
let reqList = [];
function load(dir){
	const files = fs.readdirSync(dir)
	files.map((file) => {
		console.log(`map file: ${file}`)
		const fileName = path.basename(file, '.js');
		if(fileName !== 'index'){
			console.log(`require('./${fileName}')`);
			reqList.push(fileName);
			//exports[fileName] = require(`./${fileName}`);
		}
	});
};

module.exports = {
	reqList,
	load
}
