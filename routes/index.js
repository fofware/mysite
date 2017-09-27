'use strict'
const dirRequire		= require('.././helpers/dir-require');
dirRequire.load(__dirname);
dirRequire.reqList.map( (fileName) => exports[fileName] = require(`./${fileName}`));
