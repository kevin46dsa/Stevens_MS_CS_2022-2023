const express = require('express');
const router = express.Router();
const dataVal = require('../data/datavalidation');
const getdata = require('../data/tvmazeaidata')
// needd to finish the css
//need to validate the html

router
	.route('/') // need to do error handeling
	.get(async (req, res) => {
		try{
		res.render('data/Search', {title: 'Show Finder'}).sendStatus(200);
		}
		catch(e){
		
		}
	});

router.route('/searchshows').post(async (req,res) => {  // need to do error handeling 
	
		if(!req.body) throw "Input needs to be submitted"
		let Searchreq = req.body; 
		dataVal.checkString(Searchreq.showSearchTerm)
		const data = await getdata.getShows(Searchreq.showSearchTerm);


	res.render('data/Found', {showSearchTerm: Searchreq.showSearchTerm, shows: data, title: "Shows Found"})
});	

router.route('/show/:id').get(async (req,res) => { // need to do error handeling test alt image
	req.params.id = parseInt(req.params.id)
	dataVal.checkNumber(req.params.id) 
	const data = await getdata.getShowById(req.params.id);
	res.render('data/show', {data: data, title: data.name})
});	


module.exports = router;
