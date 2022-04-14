const bands = require('./data/bands');
const connection = require('./config/mongoConnections');

const main = async () => {
	const db = await connection.connectToDb();
	await db.dropDatabase();
	let Band1 = undefined;
	let Band2 = undefined;
	let Band3 = undefined;

	//1. Create a band of your choice.
	try {
		Band1 = await bands.create(
			'Metallica',
			['Heavy Metal', 'Hard Rock', 'Thrash Metal'],
			'http://www.metallica.com',
			'Megaforce',
			[
				'James Hetfield',
				'Lars Ulrich',
				'Cliff Burton',
				'Kirk Hammett',
				'Robert Trujillo',
				'Jason Newsted',
				'Dave Mustaine',
				'Ron McGovney',
			],
			1981
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	//2. Log the newly created band. (Just that band, not all bands)
	try {
		const newBandLog = await bands.get(Band1._id.toString());
		console.log(`Here is the Band for ID: ${Band1._id.toString()}`);
		console.log(newBandLog);
	} catch (e) {
		console.log(e);
	}
	// 3.Create another band of your choice.
	try {
		Band2 = await bands.create(
			'Pink Floyd',
			['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
			'http://www.pinkfloyd.com',
			'EMI',
			[
				'Roger Waters',
				'David Gilmour',
				'Nick Mason',
				'Richard Wright',
				'Sid Barrett',
			],
			1965
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	//4. Query all bands, and log them all
	try {
		const allBands = await bands.getAll();
		console.log('Here is all the Bands in the DataBase !!');
		console.log(allBands);
	} catch (e) {
		console.log(e);
	}

	//5. Create the 3rd band of your choice.
	try {
		Band3 = await bands.create(
			'Fleetwood Mac',
			[
				'pop rock',
				'folk rock',
				'soft rock',
				'blues rock',
				'art pop',
				'British blues',
			],
			'http://www.fleetwoodmac.com',
			'Blue Horizon',
			['Peter Green', 'Jeremy Spencer', 'Bob Brunning', 'Mick Fleetwood'],
			1967
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	//6. Log the newly created 3rd band. (Just that band, not all bands)
	try {
		const newBandLog = await bands.get(Band3._id.toString());
		console.log(`Here is the Band for ID: ${Band3._id.toString()}`);
		console.log(newBandLog);
	} catch (e) {
		console.log(e);
	}
	//7. Rename the first band
	try {
		const renameBand = await bands.rename(Band1._id.toString(), 'FKJ');
		console.log('Band Renamed!!');
	} catch (e) {
		console.log(e);
	}

	//8.Log the first band with the updated name.
	try {
		const newBandLog = await bands.get(Band1._id.toString());
		console.log(`Here is the Band for ID: ${Band1._id.toString()}`);
		console.log(newBandLog);
	} catch (e) {
		console.log(e);
	}

	//9. Remove the second band you created.

	try {
		const newBandLog = await bands.remove(Band2._id.toString());
		console.log('Band Removed Successfully !!');
	} catch (e) {
		console.log(e);
	}

	//10. Query all bands, and log them all
	try {
		const allBands = await bands.getAll();
		console.log('Here is all the Bands in the DataBase !!');
		console.log(allBands);
	} catch (e) {
		console.log(e);
	}

	//11.Try to create a band with bad input parameters to make sure it throws errors.
	// bad name
	try {
		Band3 = await bands.create(
			'      ',
			['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
			'http://www.pinkfloyd.com',
			'EMI',
			[
				'Roger Waters',
				'David Gilmour',
				'Nick Mason',
				'Richard Wright',
				'Sid Barrett',
			],
			1965
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	// wrong website

	try {
		Band3 = await bands.create(
			'Pink floyd',
			['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
			'http://ww.pinkfloyd.net',
			'EMI',
			[
				'Roger Waters',
				'David Gilmour',
				'Nick Mason',
				'Richard Wright',
				'Sid Barrett',
			],
			1965
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	// Empty Band Members
	try {
		Band3 = await bands.create(
			'Pink floyd',
			['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
			'http://www.pinkfloyd.com',
			'EMI',
			[],
			1965
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	// Bad Year input

	try {
		Band3 = await bands.create(
			'Pink floyd',
			['Progressive Rock', 'Psychedelic rock', 'Classic Rock'],
			'http://www.pinkfloyd.com',
			'EMI',
			[
				'Roger Waters',
				'David Gilmour',
				'Nick Mason',
				'Richard Wright',
				'Sid Barrett',
			],
			2200
		);
		console.log('Band has been added Rock and Roll!!');
	} catch (e) {
		console.log(e);
	}

	//12. Try to remove a band that does not exist to make sure it throws errors.
	// Wrong ID
	try {
		const newBandLog = await bands.remove('620c95a338ff12286ab026ad');
		console.log('Band Removed Successfully !!');
	} catch (e) {
		console.log(e);
	}

	//13. Try to rename a band that does not exist to make sure it throws errors.
	// wrong ID
	try {
		const renameBand = await bands.rename('620c95a338ff12286ab026ad', 'FKJ');
		console.log('Band Renamed!!');
	} catch (e) {
		console.log(e);
	}

	//14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
	// Wrong Name (Only Spaces)
	try {
		const renameBand = await bands.rename(Band1._id.toString(), '      ');
		console.log('Band Renamed!!');
	} catch (e) {
		console.log(e);
	}

	// Same Name as the current value of the band

	try {
		const renameBand = await bands.rename(
			Band3._id.toString(),
			'Fleetwood Mac'
		);
		console.log('Band Renamed!!');
	} catch (e) {
		console.log(e);
	}

	//15. Try getting a band by ID that does not exist to make sure it throws errors.
	// wrong ID
	try {
		const newBandLog = await bands.get('620c95a338ff12286ab026ad');
		console.log(newBandLog);
	} catch (e) {
		console.log(e);
	}

	// logging all the bands to check if anything changed
	try {
		const allBands = await bands.getAll();
		console.log('Here is all the Bands in the DataBase !!');
		console.log(allBands);
	} catch (e) {
		console.log(e);
	}

	await connection.closeConnection();
	console.log('Done!');
};

main();
