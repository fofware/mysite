'use strict'
const path	= require('path');
const dirRequire		= require('.././helpers/dir-require');
//dirRequire.load(__dirname).map( (fileName) => exports[fileName] = require(`./${fileName}`));
dirRequire.getFiles(`${__dirname}`).map( (filename)  => {
	console.log(filename)	
	const name =  path.basename(filename)+'Route';
	exports[name] = require(`./${filename}`)
});
