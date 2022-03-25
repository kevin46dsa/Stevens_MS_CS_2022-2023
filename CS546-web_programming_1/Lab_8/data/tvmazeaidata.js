const axios = require('axios');
const dataVal = require("./datavalidation")

// need to make code efficient 
// need to limit to only 5 elements
// if no data found return error
async function getShows(string) {
	if(!string) throw "Input must be provided"
	dataVal.checkString(string)
	
	let { data } = await axios.get(
		`https://api.tvmaze.com/search/shows?q=${string}`
	);

	let data5 = []
	for (i = 0; i<5 ;i++){
		data5.push(data[i].show)
	}
	return data5; // this will be an array of shows found
}

async function getShowById(id){

	//add data validation
	let { data } = await axios.get(
		`https://api.tvmaze.com/shows/${id}`
	);

	return data
}


module.exports = {
	getShows,
	getShowById
}