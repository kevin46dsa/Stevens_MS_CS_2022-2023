const axios = require('axios');

async function getPeople() {
	let { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
	);
	return data; // this will be the array of people objects
}

function checkInput(Id) {
	if (typeof Id === 'undefined') throw 'Input is undefined';
	else if (Id === null) throw 'Input is null Value';
	else if (!(typeof Id === 'string' || Id instanceof String))
		throw 'Input is not a String';
	else if (Id.trim().length === 0) throw 'Input contains only Spaces';
}

function checkdot(input) {
	let checkdot = input.match(/\./g);
	let checklen = checkdot.length;
	let checkdotPluschar = input.match(/\.\w\w/g);

	if (checklen < 1) throw "Email Domain Does not have '.'";
	if (!(checklen === checkdotPluschar.length))
		throw 'Email Domain does not have at LEAST 2 LETTERS after the dot';
}

function inputMod(input) {
	let checked = input.trim().split('@').join('');
	return checked;
}

function checkbirthday(month, date) {
	if (typeof month === 'undefined' || typeof date === 'undefined')
		throw 'Input is undefined';
	else if (month === null || date === null) throw 'Input is null Value';

	if (!(typeof month === 'number')) {
		if (isNaN(checkmonth(month))) throw 'cannot parse month string to number';
	}
	if (!(typeof date === 'number')) {
		if (isNan(checkdate(date))) throw 'cannot parse date string to number';
	}
}

function checkmonth(month) {
	if (typeof month === 'string') {
		return parseInt(month);
	} else throw 'month not number datatype';
}

function checkdate(date) {
	if (typeof date === 'string') {
		return parseInt(date);
	} else throw 'month not number datatype';
}

function checkvalidity(month, date) {
	if ((month, date > 0 && month <= 12 && date <= 31)) {
		if (month === 2 && date >= 29) throw 'Month of february has only 28 days';
		if (month === 4 && date >= 31) throw 'the month of April has only 30 days';
		if (month === 6 && date >= 31) throw 'the month of June has only 30 days';
		if (month === 9 && date >= 31)
			throw 'the month of September has only 30 days';
		if (month === 11 && date >= 31)
			throw 'the month of November has only 30 days';
	} else throw 'Month/date is out of bounds';
}

function average(data) {
	var i = 0,
		summ = 0,
		ArrayLen = data.length;
	while (i < ArrayLen) {
		summ = summ + data[i++];
	}
	avg = summ / ArrayLen;
	return avg;
}

async function getPersonById(Id) {
	checkInput(Id);
	let inputtrim = Id.trim();
	const data = await getPeople();
	let match = {};
	let flag = false;
	for (d in data) {
		if (data[d].id === inputtrim) {
			// Assuming that there are no duplicate ID's
			flag = true;
		}
		if (flag) return data[d];
	}
	if (!flag) throw 'Person not found';
}

async function sameEmail(emailDomain) {
	checkInput(emailDomain);
	let modEmail = inputMod(emailDomain);
	checkdot(modEmail);
	const data = await getPeople();
	let emailMatch = [];

	for (d in data) {
		let split = data[d].email.split('@'); // Assuming email does not have multiple '@'
		if (
			split[1].toUpperCase() === modEmail ||
			split[1].toLowerCase() === modEmail
		)
			emailMatch.push(data[d]);
	}
	if (emailMatch.length >= 2) return emailMatch;
	else if (emailMatch.length == 0) throw 'No Matches found';
	else throw 'At least 2 Same Email domain not found';
}

async function manipulateIp() {
	let data = await getPeople();
	let averagedata = [];
	let manipulatedobj = {};
	for (d in data) {
		data[d].ip_address = data[d].ip_address.replaceAll('.', '');
		data[d].ip_address = data[d].ip_address.split('').sort().join('');
		data[d].ip_address = parseInt(data[d].ip_address);
		averagedata.push(data[d].ip_address);
	}
	averagedata = averagedata.sort();
	let highest = averagedata[averagedata.length - 1];
	let lowest = averagedata[0];
	let avg = Math.floor(average(averagedata));

	for (d in data) {
		if (data[d].ip_address === highest) {
			manipulatedobj['Highest'] = {
				firstName: data[d].first_name,
				lastName: data[d].last_name,
			};
		}
		if (data[d].ip_address === lowest) {
			manipulatedobj['lowest'] = {
				firstName: data[d].first_name,
				lastName: data[d].last_name,
			};
		}
	}
	manipulatedobj['average'] = avg;
	return manipulatedobj;
}

async function sameBirthday(month, day) {
	checkbirthday(month, day);
	checkvalidity(month, day);
	let data = await getPeople();
	let matchsamebirth = [];
	for (d in data) {
		let split = data[d].date_of_birth.split('/');
		if (split[0] === String(month) && split[1] === String(day)) {
			matchsamebirth.push(`${data[d].first_name} ${data[d].last_name}`);
		}
	}
	if (matchsamebirth.length > 0) return matchsamebirth;
	else throw 'No People with that birthday';
}

module.exports = {
	getPersonById,
	sameEmail,
	manipulateIp,
	sameBirthday,
};
