'use strict'
const app		= require('./app');
const User	= require('./controlers/artMedia');


app.listen(8088, () => {
	console.log(`Server corriendo en puerto 8088`);
});

User.list()
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			console.error(err)
		})