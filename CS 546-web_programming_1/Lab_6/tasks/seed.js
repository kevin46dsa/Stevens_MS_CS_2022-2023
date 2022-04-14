const data = require('../data/index');
const bands = data.bands;
const albums = data.albums;
const connection = require('./config/mongoConnection');

const main = async () => {
	const db = await connection();
	await db.dropDatabase();

	const band1 = await bands.create(
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
};

main();
