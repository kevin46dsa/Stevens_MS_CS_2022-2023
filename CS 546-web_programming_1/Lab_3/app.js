const people = require('./people');
const stocks = require('./stocks');

async function main() {
	try {
		const peopledata = await people.getPersonById(
			'7989fa5e-5617-43f7-a931-46036f9dbcff'
		);
		console.log(peopledata);
	} catch (e) {
		console.log(e);
	}

	try {
		const sameEmail = await people.sameEmail('@harvard.edu.');
		console.log(sameEmail);
	} catch (e) {
		console.log(e);
	}

	try {
		const manipulateIp = await people.manipulateIp();
		console.log(manipulateIp);
	} catch (e) {
		console.log(e);
	}

	try {
		const sameBirthday = await people.sameBirthday(2, 31);
		console.log(sameBirthday);
	} catch (e) {
		console.log(e);
	}

	try {
		const shareholder = await stocks.listShareHolders(
			'Powell Industries, Inc.'
		);
		console.log(shareholder);
	} catch (e) {
		console.log(e);
	}

	try {
		const shareholder = await stocks.totalShares('Foobar Inc');
		console.log(shareholder);
	} catch (e) {
		console.log(e);
	}
	try {
		const shareholder = await stocks.listStocks(1, 2);
		console.log(shareholder);
	} catch (e) {
		console.log(e);
	}
	try {
		const shareholder = await stocks.getStockById(
			'f652f797-7ca0-4382-befb-2ab8be914ff0'
		);
		console.log(shareholder);
	} catch (e) {
		console.log(e);
	}
}

//call main
main();
