const apiRoutes = require('./marvelRoutes');

const constructorMethod = (app) => {
	
	app.use('/api', apiRoutes); 
	
	app.use('*', (req, res) => {
		res.status(404).json({ Welcome: 'Hello World this is Marvel CS554_API Lab 2'});
	});
};

module.exports = constructorMethod;