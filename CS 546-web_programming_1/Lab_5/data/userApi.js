const axios = require('axios');

async function getPeople() {
	let { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json'
	);
	return data; // this will be the array of people objects
}

async function getWork() {
	let { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json'
	);
	return data; // this will be the array of work objects
}

let exportedMethods = {
	async getAllPeople() {
		let data = await getPeople();
		return data;
	},

	async getAllWork() {
		let data = await getWork();
		return data;
	},

	async getPeopleById(id) {
		let data = await getPeople();
		let flag = false;
		for (d in data) {
			if (data[d].id === id) {
				// Assuming that there are no duplicate ID's
				flag = true;
			}
			if (flag) return data[d];
		}
		if (!flag) throw 'there is no person with that ID';
	},

	async getWorkById(id) {
		let data = await getWork();
		let flag = false;
		for (d in data) {
			if (data[d].id === id) {
				// Assuming that there are no duplicate ID's
				flag = true;
			}
			if (flag) return data[d];
		}
		if (!flag) throw ' there is no company with that ID';
	},
};

module.exports = exportedMethods;
