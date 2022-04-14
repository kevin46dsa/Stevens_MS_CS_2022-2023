const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const dataVal = require('./dataValidation');
const bandFunc = require('./bands');
const { ObjectId } = require('mongodb');

const exportedMethods = {
	async create(bandId, title, releaseDate, tracks, rating) {
		if (!bandId || !title || !releaseDate || !tracks || !rating)
			throw 'All fields need to have valid values';
		bandId = dataVal.checkID(bandId);
		const bandCollection = await bands();
		const findBand = await bandCollection.findOne({ _id: ObjectId(bandId) });
		if (findBand === null) throw 'No band with that id';
		title = dataVal.checkString(title);
		dataVal.checkReleaseDate(releaseDate);
		tracks = dataVal.checkTrack(tracks);
		rating = dataVal.checkRating(rating);

		let newAlbumID = ObjectId();

		const updateInfo = await bandCollection.updateOne(
			{ _id: ObjectId(bandId) },
			{
				$addToSet: {
					albums: {
						_id: newAlbumID,
						title: title,
						releaseDate: releaseDate,
						tracks: tracks,
						rating: rating,
					},
				},
			}
		);

		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';

		let flag = await bandFunc.updateRating(bandId);
		if (flag === false) throw 'There was something wrong with the update';
		newAlbumID = newAlbumID.toString();
		const createdAlbum = await this.get(newAlbumID);

		return createdAlbum;
	},

	async getAll(bandId) {
		if (!bandId) throw 'Need to provide Band ID';
		bandId = dataVal.checkID(bandId);
		const bandCollection = await bands();
		const findBand = await bandCollection.findOne({ _id: ObjectId(bandId) });
		if (findBand === null) throw 'No band with that id';
		const allAlbums = findBand.albums;
		for (i in allAlbums) {
			allAlbums[i]._id = allAlbums[i]._id.toString();
		}
		if (allAlbums.length === 0) {
			return [];
		} else {
			return allAlbums;
		}
	},

	async get(albumId) {
		// needs to be done   try with Aggregate query later
		if (!albumId) throw 'Need to provide album ID';
		albumId = dataVal.checkID(albumId);
		const bandCollection = await bands();
		let allAlbums = await bandCollection.findOne(
			{
				'albums._id': ObjectId(albumId),
			},
			{ projection: { _id: 0, albums: 1 } }
		);
		if (!allAlbums) throw 'album not found';
		allAlbums = allAlbums.albums;

		for (i in allAlbums) {
			let albumcheck = allAlbums[i]._id.toString();

			if (albumcheck === albumId) {
				return allAlbums[i];
			}
		}
	},

	async remove(albumId) {
		if (!albumId) throw 'Need to provide Album ID';
		albumId = dataVal.checkID(albumId);
		const album = await this.get(albumId);
		if (album === null) throw 'No Album with that id';

		const bandCollection = await bands();

		const band = await bandCollection.findOne({
			'albums._id': ObjectId(albumId),
		});

		let bandId = band._id;
		bandId = bandId.toString();

		const updateInfo = await bandCollection.updateOne(
			{ _id: ObjectId(bandId) },
			{ $pull: { albums: { _id: ObjectId(albumId) } } }
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		let flag = await bandFunc.updateRating(bandId);
		if (flag === false) throw 'There was something wrong with the update';
		let updatedBand = await bandFunc.get(bandId); //function converts id to string so not required
		return updatedBand;
	},
	async getBandfromAlbumID(albumId) {
		if (!albumId) throw 'Need to provide album ID';
		albumId = dataVal.checkID(albumId);
		const bandCollection = await bands();
		const band = await bandCollection.findOne({
			'albums._id': ObjectId(albumId),
		});
		if (!band) throw 'Album Not Found';
		return band;
	},
};

module.exports = exportedMethods;
