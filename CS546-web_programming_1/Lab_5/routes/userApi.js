const express = require('express');
const router = express.Router();
const data = require('../data');
const apiData = data.userApiData;
const validation = require('../data/validation.js');

router.route('/people').get(async (req, res) => {
	try {
		let people = await apiData.getAllPeople();
		res.json(people);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.route('/work').get(async (req, res) => {
	try {
		let work = await apiData.getAllWork();
		res.json(work);
	} catch (e) {
		res.status(404).json(e);
	}
});

router.route('/people/:id').get(async (req, res) => {
	try {
		req.params.id = validation.checkId(req.params.id);
		let peopleById = await apiData.getPeopleById(req.params.id);
		res.json(peopleById);
	} catch (e) {
		res.status(404).json(e);
	}
});
router.route('/work/:id').get(async (req, res) => {
	try {
		req.params.id = validation.checkId(req.params.id);
		let WorkById = await apiData.getWorkById(req.params.id);
		res.json(WorkById);
	} catch (e) {
		res.status(404).json(e);
	}
});
module.exports = router;
