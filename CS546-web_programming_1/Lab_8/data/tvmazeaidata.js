const axios = require('axios');
const dataVal = require("./datavalidation")

// need to make code efficient 

// if no data found return error
async function getShows(string) {
	if(!string) throw "Input must be provided"
	dataVal.checkString(string)
	
	let { data } = await axios.get(
		`https://api.tvmaze.com/search/shows?q=${string}`
	);
	data = data.slice(0,5)
	return data; // this will be an array of shows found
}

async function getShowById(id){   // add is data is not found
	

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