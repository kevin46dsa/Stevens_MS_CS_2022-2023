const express = require('express');
const router = express.Router();
//const dataVal = require('../data/datavalidation');

router
	.route('/')
	.get(async (req, res) => {
		res.render('data/index')
	
	});
	

router.route('/album/:id').get(async (req, res) => {
	try {
		if (!req.params.id) throw 'You must Specify :id';
		req.params.id = dataVal.checkID(req.params.id);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	try {
		const albumReq = await albumData.get(req.params.id);
		res.status(200).json(albumReq);
	} catch (e) {
		res.status(404).json({ error: e });
	}
});

module.exports = router;
