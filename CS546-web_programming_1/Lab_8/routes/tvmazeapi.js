const express = require('express');
const router = express.Router();
const dataVal = require('../data/datavalidation');
const getdata = require('../data/tvmazeaidata')

router
	.route('/')
	.get(async (req, res) => {
		res.render('data/Search')
		//res.render('data/Found', {})
	});

router.route('/searchshows').post(async (req,res) => {
	let Searchreq = req.body; 
	dataVal.checkString(Searchreq.showSearchTerm)
	const data = await getdata.getShows(Searchreq.showSearchTerm);

	res.render('data/Found', {showSearchedTearm: Searchreq.showSearchTerm, shows: data})
});	

router.route('/show/:id').get(async (req,res) => {
	req.params.id = parseInt(req.params.id)
	dataVal.checkNumber(req.params.id) 
	const data = await getdata.getShows(Searchreq.showSearchTerm);
	res.render('data/Found', {showSearchedTearm: Searchreq.showSearchTerm, shows: data})
});	


module.exports = router;
