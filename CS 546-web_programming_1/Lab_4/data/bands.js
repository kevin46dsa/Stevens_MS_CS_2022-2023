const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

function checkID(id) {
	if (typeof id !== 'string') throw 'Id must be a string';
	if (id.trim().length === 0)
		throw 'Id cannot be an empty string or just spaces';
	id = id.trim();
	if (!ObjectId.isValid(id)) throw 'invalid object ID';
	return id;
}

function checkString(string) {
	if (typeof string !== 'string') throw 'input must be a string';
	if (string.trim().length === 0)
		throw 'Input cannot be an empty string or string with just spaces';
	string = string.trim();
	return string;
}

function checkArray(Arr) {
	if (!Array.isArray(Arr))
		throw 'You must provide an array for Genre/BandMembers';
	if (Arr.length === 0) throw 'You must supply at least one Genre/BandMembers';
	for (i in Arr) {
		Arr[i] = checkString(Arr[i]);
	}
	return Arr;
}

function checkWebsite(website) {
	let webhttp = website.substr(0, 11);
	let webcom = website.substr(-4);
	let web = website.slice(11, -4);

	if (webhttp !== 'http://www.')
		throw 'the website is invalid needs http://www. in the start';
	if (webcom !== '.com') throw 'the website is invalid needs .com in the end';
	if (web.length < 5) throw 'the website needs to be greater than 5 char';
}

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
		name = checkString(name);
		genre = checkArray(genre);
		website = checkString(website);
		checkWebsite(website);
		recordLabel = checkString(recordLabel);
		bandMembers = checkArray(bandMembers);
		if (typeof yearFormed !== 'number') throw 'yearFormed must be a number';
		if (yearFormed <= 1900 || yearFormed >= 2022)
			throw 'Year formed should be less than 1900 or greater than the current year (2022) ';
		//need to add website

		const bandCollection = await bands();
		let newBand = {
			name: name,
			genre: genre,
			website: website,
			recordLabel: recordLabel,
			bandMembers: bandMembers,
			yearFormed: yearFormed,
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
		let bandList = await bandCollection.find({}).toArray();
		if (!bandList) throw 'Could not get all Bands';
		bandList.forEach((element) => {
			element._id = element._id.toString();
		});
		return bandList;
	},

	async get(id) {
		if (!id) throw 'You must provide an id to search for';
		id = checkID(id);
		const bandCollection = await bands();
		const findBand = await bandCollection.findOne({ _id: ObjectId(id) });
		if (findBand === null) throw 'No band with that id';
		findBand._id = findBand._id.toString();
		return findBand;
	},

	async remove(id) {
		if (!id) throw 'You must provide an id to search for';
		id = checkID(id);
		const findBand = await this.get(id);
		let bandName = findBand.name;
		const bandCollection = await bands();
		const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete Band with id of ${id}`;
		} else {
			let delDone = `${bandName} has been successfully deleted!`;
			return delDone;
		}
	},

	async rename(id, newName) {
		if (!id) throw 'You must provide an id to search for';
		id = checkID(id);
		if (!newName) throw 'You must provide a Name for The Band';
		newName = checkString(newName);
		const bandCollection = await bands();
		const findBand = await this.get(id);
		let bandName = findBand.name;
		if (bandName === newName)
			throw 'New Name is the same as Existing Band Name';
		const updatedBand = {
			name: newName,
		};

		const updatedInfo = await bandCollection.updateOne(
			{ _id: ObjectId(id) },
			{ $set: updatedBand }
		);
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update Band successfully';
		}

		const band = await this.get(id);
		return band;
	},
};
