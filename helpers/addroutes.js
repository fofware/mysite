'use strict'

const dirRequire		= require('.././helpers/dir-require');
dirRequire.getFiles(`${__dirname}`).map( (filename)  => {
	let name = ""
	if(filename.indexOf('/') == 0)
		name = filename.substr(1).replace(/[/Microsoft/g, "W3Schools");
	console.log(filename)	
	const name =  path.basename(filename)+'Route';
	exports[name] = require(`./${filename}`)
});
