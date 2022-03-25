const express = require('express');
const router = express.Router();
const dataVal = require('../data/datavalidation');
const getdata = require('../data/tvmazeaidata')

router
	.route('/')
	.get(async (req, res) => {
		res.render('data/Search', {title: 'Show Finder'})
		
	});

router.route('/searchshows').post(async (req,res) => {
	let Searchreq = req.body; 
	dataVal.checkString(Searchreq.showSearchTerm)
	const data = await getdata.getShows(Searchreq.showSearchTerm);

	res.render('data/Found', {showSearchedTearm: Searchreq.showSearchTerm, shows: data, title: "Shows Found"})
});	

router.route('/show/:id').get(async (req,res) => {
	req.params.id = parseInt(req.params.id)
	dataVal.checkNumber(req.params.id) 
	const data = await getdata.getShowById(req.params.id);
	res.render('data/show', {data: data, title: data.name})
});	


module.exports = router;
