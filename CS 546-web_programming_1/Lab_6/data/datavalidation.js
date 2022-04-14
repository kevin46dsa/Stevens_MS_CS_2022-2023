const { ObjectId } = require('mongodb');

function checkID(id) {
	if (!id) throw `Error: You must provide a valid ID`;
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

function checkyear(year) {
	if (typeof year !== 'number' || !Number.isInteger(year))
		throw 'yearFormed must be in the format of YYYY';
	if (year <= 1900 || year >= 2022)
		throw 'Only years 1900-2022 are valid values';
	return year;
}

function checkReleaseDate(date) {
	//can add more checks for better attention to detail
	date = checkString(date);
	if (Date(date) !== 'Invalid Date' && !isNaN(new Date(date))) {
		let splitDate = date.split('/');
		if (splitDate.length === 3) {
			if (
				(splitDate[0].length, splitDate[1].length !== 2) ||
				splitDate[2].length !== 4
			)
				throw 'Release date need to be in the format of MM/DD/YYY';
			if (splitDate[2] < 1900 || splitDate[2] > 2023)
				throw 'Only years 1900-2023 are valid values';
			return date;
		}
	} else throw 'Invalid Date Format needs to be MM/DD/YYYY';
}

function checkTrack(Arr) {
	if (!Array.isArray(Arr)) throw 'You must provide an array for Tracks';
	if (Arr.length < 3) throw 'You must supply at least Three Tracks';
	for (i in Arr) {
		Arr[i] = checkString(Arr[i]);
	}
	return Arr;
}

function checkRating(rating) {
	if (typeof rating !== 'number') throw 'Rating must be a number';
	if (rating < 1 || rating > 5) throw 'Rating will be in the range of 1-5';
	let splitRating = rating.toString();
	splitRating = splitRating.split('.');
	if (splitRating.length === 1) {
		return rating;
	} else if (splitRating.length === 2) {
		if (splitRating[1].length !== 1) {
			throw 'Enter Rating upto one decimal place only';
		}
	} else throw 'Rating can have only one decimal point Invalid input';
	return rating;
}

module.exports = {
	checkID,
	checkString,
	checkArray,
	checkWebsite,
	checkyear,
	checkReleaseDate,
	checkTrack,
	checkRating,
};
