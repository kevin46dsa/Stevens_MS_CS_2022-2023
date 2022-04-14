const axios = require('axios');
const dataVal = require("./datavalidation")

// need to make code efficient 

// if no data found return error
async function getShows(string) {
	if(!string) throw "Input must be provided"
	dataVal.checkString(string)
	try{
	var { data } = await axios.get(
		`https://api.tvmaze.com/search/shows?q=${string}`
	);
	}
	catch(e){
		throw `Axios Error: No Show with that name`;
	}
	if(!data) throw "No Show with that name"
	data = data.slice(0,5) //slices the array to only the first 5 elements
	return data; // this will be an array of shows found
}

async function getShowById(id){   // add is data is not found
	await dataVal.checkNumber(id);

	//add data validation
	try{
	var { data } = await axios.get(
		`https://api.tvmaze.com/shows/${id}`
	);
	}
	catch(e){
		throw `Axios Error: No Show with that ID Request Failed with status code 404`;
	}
	if(data.name === "Not Found") throw "No Show found with that id"
	else return data
}


module.exports = {
	getShows,
	getShowById
}