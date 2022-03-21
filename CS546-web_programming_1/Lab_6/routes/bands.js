const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const dataVal = require('../data/datavalidation');

router
	.route('/')
	.get(async (req, res) => {
		try {
			const allBands = await bandData.getAll();
			res.status(200).json(allBands);
		} catch (e) {
			res.status(404).json({ error: e });
		}
	})
	.post(async (req, res) => {
		let bandInfo = req.body;
		try {
			if (
				!bandInfo.name ||
				!bandInfo.genre ||
				!bandInfo.website ||
				!bandInfo.recordLabel ||
				!bandInfo.bandMembers ||
				!bandInfo.yearFormed
			)
				throw 'All fields need to have valid values';
			bandInfo.name = dataVal.checkString(bandInfo.name);
			bandInfo.genre = dataVal.checkArray(bandInfo.genre);
			bandInfo.website = dataVal.checkString(bandInfo.website);
			dataVal.checkWebsite(bandInfo.website);
			bandInfo.recordLabel = dataVal.checkString(bandInfo.recordLabel);
			bandInfo.bandMembers = dataVal.checkArray(bandInfo.bandMembers);
			bandInfo.yearFormed = dataVal.checkyear(bandInfo.yearFormed);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			const newBand = await bandData.create(
				bandInfo.name,
				bandInfo.genre,
				bandInfo.website,
				bandInfo.recordLabel,
				bandInfo.bandMembers,
				bandInfo.yearFormed
			);
			res.status(200).json(newBand);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			req.params.id = dataVal.checkID(req.params.id);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			const requestedBand = await bandData.get(req.params.id);
			res.status(200).json(requestedBand);
		} catch (e) {
			res.status(404).json({ error: e });
		}
	})
	.put(async (req, res) => {
		let bandInfo = req.body;
		try {
			req.params.id = dataVal.checkID(req.params.id);
			if (
				!bandInfo.name ||
				!bandInfo.genre ||
				!bandInfo.website ||
				!bandInfo.recordLabel ||
				!bandInfo.bandMembers ||
				!bandInfo.yearFormed
			)
				throw 'All fields need to have valid values';
			bandInfo.name = dataVal.checkString(bandInfo.name);
			bandInfo.genre = dataVal.checkArray(bandInfo.genre);
			bandInfo.website = dataVal.checkString(bandInfo.website);
			dataVal.checkWebsite(bandInfo.website);
			bandInfo.recordLabel = dataVal.checkString(bandInfo.recordLabel);
			bandInfo.bandMembers = dataVal.checkArray(bandInfo.bandMembers);
			bandInfo.yearFormed = dataVal.checkyear(bandInfo.yearFormed);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			await bandData.get(req.params.id);
		} catch (e) {
			return res.status(404).json({ error: e });
		}
		try {
			const updatedUser = await bandData.update(
				req.params.id,
				bandInfo.name,
				bandInfo.genre,
				bandInfo.website,
				bandInfo.recordLabel,
				bandInfo.bandMembers,
				bandInfo.yearFormed
			);
			res.status(200).json(updatedUser);
		} catch (e) {
			res.status(404).json({ error: e });
		}
	})
	.delete(async (req, res) => {
		try {
			req.params.id = dataVal.checkID(req.params.id);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			await bandData.get(req.params.id);
		} catch (e) {
			return res.status(404).json({ error: e });
		}
		try {
			const removeRes = await bandData.remove(req.params.id);
			res.status(200).json({ bandId: req.params.id, deleted: removeRes });
		} catch (e) {
			res.status(404).json({ error: e });
		}
	});

module.exports = router;
