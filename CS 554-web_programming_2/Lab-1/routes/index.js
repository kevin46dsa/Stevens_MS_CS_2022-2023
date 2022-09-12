const usersRoutes = require('./users');

const constructorMethod = (app) => {
	
	app.use('/sweets', usersRoutes); 
	
	app.use('*', (req, res) => {
		res.status(404).json({ Welcome: 'Hello World', Login: "login URL", Signup: "Signup URL"});
	});
};

module.exports = constructorMethod;