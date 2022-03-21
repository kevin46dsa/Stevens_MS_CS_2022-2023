const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const dataVal = require('./dataValidation');
const { ObjectId } = require('mongodb');

module.exports = {
	async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
		if (
			!name ||
			!genre ||
			!website ||
			!recordLabel ||
			!bandMembers ||
			!yearFormed
		)
			throw 'All fields need to have valid values';
		name = dataVal.checkString(name);
		genre = dataVal.checkArray(genre);
		website = dataVal.checkString(website);
		dataVal.checkWebsite(website);
		recordLabel = dataVal.checkString(recordLabel);
		bandMembers = dataVal.checkArray(bandMembers);
		yearFormed = dataVal.checkyear(yearFormed);

		const bandCollection = await bands();
		let newBand = {
			name: name,
			genre: genre,
			website: website,
			recordLabel: recordLabel,
			bandMembers: bandMembers,
			yearFormed: yearFormed,
			albums: [],
			overallRating: 0,
		};

		const insertInfo = await bandCollection.insertOne(newBand);
		if (!insertInfo.acknowledged || !insertInfo.insertedId)
			throw 'Could not add band';

		const newId = insertInfo.insertedId.toString();

		const band = await this.get(newId);
		return band;
	},

	async getAll() {
		const bandCollection = await bands();
		let bandList = await bandCollection
			.find({}, { projection: { _id: 1, name: 1 } })
			.toArray();
		if (!bandList) throw 'Could not get all Bands';
		bandList.forEach((element) => {
			element._id = element._id.toString();
		});
		return bandList;
	},

	async get(id) {
		//Returns band with id converted to string
		if (!id) throw 'You must provide an id to search for';
		id = dataVal.checkID(id);
		const bandCollection = await bands();
		const findBand = await bandCollection.findOne({ _id: ObjectId(id) });
		if (findBand === null) throw 'No band with that id';
		findBand._id = findBand._id.toString();
		return findBand;
	},

	async remove(id) {
		if (!id) throw 'You must provide an id to search for';
		id = dataVal.checkID(id);
		const bandCollection = await bands();
		const findband = await this.get(id);
		if (findband === null) throw 'No band with that id';
		const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete Band with id of ${id}`;
		} else {
			return true;
		}
	},

	async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
		if (
			!id ||
			!name ||
			!genre ||
			!website ||
			!recordLabel ||
			!bandMembers ||
			!yearFormed
		)
			throw 'All fields need to have valid values';
		id = dataVal.checkID(id);
		name = dataVal.checkString(name);
		genre = dataVal.checkArray(genre);
		website = dataVal.checkString(website);
		dataVal.checkWebsite(website);
		recordLabel = dataVal.checkString(recordLabel);
		bandMembers = dataVal.checkArray(bandMembers);
		dataVal.checkyear(yearFormed);
		const bandCollection = await bands();
		const preband = await this.get(id);
		const updatedBand = {
			name: name,
			genre: genre,
			website: website,
			recordLabel: recordLabel,
			bandMembers: bandMembers,
			yearFormed: yearFormed,
			albums: preband.albums,
			overallRating: preband.overallRating,
		};

		const updatedInfo = await bandCollection.updateOne(
			{ _id: ObjectId(id) },
			{ $set: updatedBand }
		);
		if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
			throw 'could not update Band successfully';
		}

		const band = await this.get(id);
		return band;
	},

	async updateRating(bandId) {
		// there is an error that is not updating the album check it out
		bandId = dataVal.checkID(bandId);
		const bandCollection = await bands();
		const foundBand = await this.get(bandId);
		const allAlbums = foundBand.albums;

		let updatedrating = 0;
		let total = 0;

		if (allAlbums.length === 0) {
			const updatedBand = {
				overallRating: 0,
			};
			const bandCollection = await bands();
			const updatedInfo = await bandCollection.updateOne(
				{ _id: ObjectId(bandId) },
				{ $set: updatedBand }
			);
			if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
				throw 'could not update Band successfully error occured while Update Rating';
			else return true;
		} else {
			for (i in allAlbums) {
				total += allAlbums[i].rating;
			}

			updatedrating = total / allAlbums.length;
			updatedrating = Math.round(updatedrating * 10) / 10; //rounding off the overallrating to one decimal place
			const updatedBand = {
				overallRating: updatedrating,
			};

			const updatedInfo = await bandCollection.updateOne(
				{ _id: ObjectId(bandId) },
				{ $set: updatedBand }
			);
			if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
				throw 'could not update Band successfully error occured while Update Rating';
			else return true;
		}
	},
};
