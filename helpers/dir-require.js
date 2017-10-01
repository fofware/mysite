'use strict'
const fs		= require('fs');
const path	= require('path');
//let reqList = [];
function load(dir, reqList = []){
	const files = fs.readdirSync(dir)
	files.map((file) => {
		if( fs.lstatSync(dir +'/'+ file).isDirectory() == false){
			const fileName = path.basename(file, '.js');
			if(fileName !== 'index'){
				console.log(`require('./${fileName}')`);
				reqList.push(fileName);
			}
		}
	});
	return reqList;
};

function getFiles(dir, reqFiles = [], base = ""){
	fs.readdirSync(dir).forEach(function(file){
			let subpath = dir +'/'+ file;
			if(fs.lstatSync(subpath).isDirectory()){
					getFiles(subpath, reqFiles, `${base}/${file}/`);
			} else {
				if (file !== 'index.js'){
					const fileName = path.basename(file, '.js');
					reqFiles.push(base + fileName);
				}
			}
	});
	return reqFiles     
}

module.exports = {
	getFiles,
	load
}
