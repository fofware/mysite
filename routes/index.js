'use strict'
const path	= require('path');
const dirRequire		= require('.././helpers/dir-require');
//dirRequire.load(__dirname).map( (fileName) => exports[fileName] = require(`./${fileName}`));
dirRequire.getFiles(`${__dirname}`).map( (filename)  => {
	const name =  path.basename(filename)+'Route';
//	const name = filename.replace('/','_');
	console.log('index',name, filename)
	const pepe = filename.substring(1).split('/').join('_')+'Route'
	console.log(pepe)
	exports[pepe] = require(`./${filename}`)
});
