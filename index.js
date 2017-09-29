'use strict'
const app		= require('./app');

const artMedia	= require('./controlers/artMedia');
const Media	= require('./controlers/media');


app.listen(8088, () => {
	console.log(`Server corriendo en puerto 8088`);
});



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
