const router = require('express').Router();
const jwtkey = require('../config/authconfig');
const dataFunctions = require('../data/users');
const dataValidation = require('../data/dataValidation');
var jwt = require('jsonwebtoken');
var xss = require('xss');

router.post('/newuser', async (req, res) => {
	//route used to create a new user from the signup page in frontend
	let data = undefined;

	try {
		if (req.body) data = req.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let firstName = xss(data.firstName);
	let lastName = xss(data.lastName);
	let email = xss(data.email);
	let password = xss(data.password);

	try {
		if (!firstName) throw 'No FirstName';
		if (!lastName) throw 'No LastName';
		if (!email) throw 'No Email';
		if (!password) throw 'No Password';

		firstName = dataValidation.checkName(firstName);
		lastName = dataValidation.checkName(lastName);
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);

		console.log(`${email} is trying to create a new Account`);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		var insertedBool = await dataFunctions.createUser(
			firstName,
			lastName,
			email,
			password
		); //calls create user function
		if (insertedBool) {
			console.log(`${data.email} created new account Successfully`);
			res
				.status(201)
				.send({ data: insertedBool, message: 'User created successfully' });
		} else throw 'User Not Created';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.post('/auth', async (req, res) => {
	let data = undefined;
	try {
		if (req.body) data = req.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let email = xss(data.email);
	let password = xss(data.password);
	try {
		if (!email) throw 'No Email';
		if (!password) throw 'No Password';
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
		console.log(`${email} is trying to Login`);
		email = email.toLowerCase();
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

	try {
		var checkBool = await dataFunctions.checkUser(email, password); //check bool return First name as well
		if (checkBool.authenticated === true) {
			const token = jwt.sign(
				{ email: checkBool.email, userName: checkBool.userName },
				jwtkey.secret,
				{
					expiresIn: 86400, // 24 hours
				}
			);
			console.log(`${checkBool.userName} Logged in Successfully`);
			res.status(200).send({
				accessToken: token,
				user: { email: checkBool.email, userName: checkBool.userName },
				message: 'logged in successfully',
			});
		}
	} catch (e) {
		return res.status(404).send({ Error: e });
	}
});

router.get('/', async (req, res) => {
	/*
	Shows a paginated list of Sweets in the system. 
	By default, it will show the first 50 Sweets in the collection. 
	If a querystring  (Links to an external site.)variable ?page=n is 
	provided, you will show the the next 50 Sweets for that page n So 
	page=2 will show Sweets 51-100, page=3 will show Sweets 101-150, 
	page=4 will show Sweets 151-200 and so on.. page=1 would show the 
	initial Sweets of 1-50 that you show by default on this route. 
	If there are no Sweets for a page number (meaning there are no more 
	Sweets in the DB, then you will return a 404 status code and message 
	stating there are no more Sweets) Hint: You can use the skip and limit cursors in 
	MongoDB that we learned about in 546 to make this work. 
	*/
})

router.get('/:id', async (req, res) => {
	
})

router.post('/', async (req, res) => {
	
})

router.patch('/:id', async (req, res) => {
	
})

router.post('/:id/replies', async (req, res) => {
	
})

router.delete('/:sweetId/:replyId', async (req, res) => {
	
})

router.post('/sweets/:id/likes', async (req, res) => {
	
})

router.post('/signup', async (req, res) => {
	
})

router.post('/login', async (req, res) => {
	
})

router.get('/logout', async (req, res) => {
	
})



module.exports = router;

