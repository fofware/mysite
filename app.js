'use strict'
const express 		= require('express');
const hbs				 	= require('express-handlebars');
const bodyParser	= require('body-parser');
const path 				= require('path');
const morgan			= require('morgan');
const allowCrossOrigin = require('./middlewares/cors');

const app					= express();


//app.use(morgan('dev'));
app.use(allowCrossOrigin);
//
// locales
//
//require('express-router')('thisismynewroutesfolder', app); + index.txt en esa ruta
// despues de crear app
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const route					= require('./routes');

for (const name in route) {
	console.log(`Adding route ${name}`)
	app.use( '', route[name] );
}
// View Engine
//app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({defaultLayout:'default',extname:'hbs'}));
app.set('view engine', 'hbs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;