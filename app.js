'use strict'
const express 		= require('express');
const hbs				 	= require('express-handlebars');
const bodyParser	= require('body-parser');
const path 				= require('path');

//
// locales
//
const route					= require('./routes');

const app						= express();
// View Engine
//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout:'default'}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( '', route.frontend );
app.use( '/api', route.api );

module.exports = app;