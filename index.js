'use strict'
const app		= require('./app');
const config	= require('./config');

app.listen(config._PORT, () => {
	console.log(`Server corriendo en puerto ${config._PORT}`);
});
