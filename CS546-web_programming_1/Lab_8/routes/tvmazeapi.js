const express = require('express');
const router = express.Router();
const dataVal = require('../data/datavalidation');
const getdata = require('../data/tvmazeaidata')


router
	.route('/') 
	.get(async (req, res) => {
		try{
		res.status(200).render('data/Search', {title: 'Show Finder'});
		}
		catch(e){
		res.sendStatus(404);
		}
	});

router.route('/searchshows').post(async (req,res) => {  // need to do error handeling 
	try {
		if(!req.body) throw "Input needs to be submitted"
		let Searchreq = req.body; 
		dataVal.checkString(Searchreq.showSearchTerm)
		const data = await getdata.getShows(Searchreq.showSearchTerm);
		res.status(200).render('data/Found', {showSearchTerm: Searchreq.showSearchTerm, shows: data, title: "Shows Found"})
	}
	catch(e){
		res.status(400).render('data/error', {title: 'Error', error: e, errorClass: "error"});
	}

	});	

router.route('/show/:id').get(async (req,res) => { // need to do error handeling test alt image
	try{
	if(!req.params.id)	throw "Must Provide Show ID"
	req.params.id = Number(req.params.id)
	dataVal.checkNumber(req.params.id) 
	const data = await getdata.getShowById(req.params.id);
	res.render('data/show', {data: data, title: data.name})
	}
	catch(e){
		res.status(404).render('data/error', {title: 'Error', error: e, errorClass: "error-not-found" });
	}
});	


module.exports = router;
