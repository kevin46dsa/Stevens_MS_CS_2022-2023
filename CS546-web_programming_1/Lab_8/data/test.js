async function getPeople() {
	let { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
	);
	return data; // this will be the array of people objects
}