function allowCrossOriging(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Api-Token');
	next();
}

module.exports = allowCrossOriging;