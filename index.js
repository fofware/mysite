'use strict'
const app		= require('./app');
const config	= require('./config');

const artMedia	= require('./controlers/artMedia');
const Media	= require('./controlers/media');


app.listen(config._PORT, () => {
	console.log(`Server corriendo en puerto ${config._PORT}`);
});

/*

artMedia.list(2)
	.then((response) => {
		console.error('================================')
		console.log(response);
	})
	.catch((err) => {
		console.error('--------------------------------')
		console.error(err)
	})

Media.get(102)
	.then((response) => {
		console.error('================================')
		console.log(response);
	})
	.catch((err) => {
		console.error('--------------------------------')
		console.error(err)
	})
Media.list(2, 2002)
	.then((response) => {
		console.error('================================')
//		console.log(response);
		response.data.forEach(function(element) {
			console.log(element)
		}, this);
	})
	.catch((err) => {
		console.error('--------------------------------')
		console.error(err)
	})
*/