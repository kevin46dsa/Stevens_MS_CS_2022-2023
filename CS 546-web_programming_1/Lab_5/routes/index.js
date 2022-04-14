const userApiRoutes = require('./userApi');

const constructorMethod = (app) => {
	app.use('', userApiRoutes);

	app.use('*', (req, res) => {
		res
			.status(404)
			.json([
				{ error: 'Page Not Found, try' },
				{ Peopledata: 'http://localhost:3000/people' },
				{ Workdata: 'http://localhost:3000/work' },
			]);
	});
};

module.exports = constructorMethod;
