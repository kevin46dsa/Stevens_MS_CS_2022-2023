const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const bandData = data.bands;
const dataVal = require('../data/datavalidation');

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			if (!req.params.id) throw 'You must Specify :id';
			req.params.id = dataVal.checkID(req.params.id);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			const allAlbumsOfBand = await albumData.getAll(req.params.id);
			if (allAlbumsOfBand.length === 0)
				throw `No Albums in the band ${req.params.id}`;
			res.status(200).json(allAlbumsOfBand);
		} catch (e) {
			res.status(404).json({ error: e });
		}
	})
	.post(async (req, res) => {
		let bandInfo = req.body;
		try {
			req.params.id = dataVal.checkID(req.params.id);
			if (
				!bandInfo.title ||
				!bandInfo.releaseDate ||
				!bandInfo.tracks ||
				!bandInfo.rating
			)
				throw 'All fields need to have valid values here';
			bandInfo.title = dataVal.checkString(bandInfo.title);
			dataVal.checkReleaseDate(bandInfo.releaseDate);
			bandInfo.tracks = dataVal.checkTrack(bandInfo.tracks);
			bandInfo.rating = dataVal.checkRating(bandInfo.rating);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			await bandData.get(req.params.id);

			const createdAlbum = await albumData.create(
				req.params.id,
				bandInfo.title,
				bandInfo.releaseDate,
				bandInfo.tracks,
				bandInfo.rating
			);

			const band = await albumData.getBandfromAlbumID(
				createdAlbum._id.toString()
			);
			res.status(200).json(band);
		} catch (e) {
			return res.status(404).json({ error: e });
		}
	})
	.delete(async (req, res) => {
		try {
			if (!req.params.id) throw 'You must Specify :id';
			req.params.id = dataVal.checkID(req.params.id);
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			const band = await albumData.getBandfromAlbumID(req.params.id.toString());
			const removeRes = await albumData.remove(req.params.id);
			if (removeRes._id.toString() === band._id.toString())
				res.status(200).json({ albumId: req.params.id, deleted: true });
			else throw 'Something went wrong';
		} catch (e) {
			res.status(404).json({ error: e });
		}
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
