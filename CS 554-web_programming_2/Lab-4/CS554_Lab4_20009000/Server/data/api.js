const axios = require('axios');
const apiURL = require('../config')
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});


async function getCharactersBySearch(searchTerm){

    //dataValidation
    searchTerm = checkSearchTerm(searchTerm);

    // fetching data
    let urlCharacters = `https://gateway.marvel.com:443/v1/public/characters`;
	const {data} = await axios.get(urlCharacters+apiURL.apiKey+'&nameStartsWith='+searchTerm);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {results:results}

    return {result:finalData }; 

}

async function getComicsBySearch(searchTerm){

    //dataValidation
    searchTerm = checkSearchTerm(searchTerm);
    // fetching data
    let urlCharacters = `https://gateway.marvel.com:443/v1/public/comics`;
	const {data} = await axios.get(urlCharacters+apiURL.apiKey+'&titleStartsWith='+searchTerm);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {results:results}

    return {result:finalData}; 

}

async function getStoriesBySearch(searchTerm){

    //dataValidation
    searchTerm = checkSearchTerm(searchTerm);
    // fetching data
    let urlCharacters = `https://gateway.marvel.com:443/v1/public/stories`;
	const {data} = await axios.get(urlCharacters+apiURL.apiKey+'&characters='+searchTerm);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {results:results}

    return {result:finalData}; 

}


async function getCharactersByPage(pageNum){
    checkNumber(pageNum)
    pageNum = pageNum - 1  
    // calculating page num
    let offset = pageNum * 20

    // fetching data
    let urlCharacters = `https://gateway.marvel.com:443/v1/public/characters`;
	const {data} = await axios.get(urlCharacters+apiURL.apiKey+'&limit=20&offset='+offset);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {offset: data.data.offset,total:data.data.total,results:results}
    // cashing the page in redis 
    let acknowlwdge = await client.set(`characterPage${pageNum}`, JSON.stringify(finalData));

    return {result:finalData ,message: acknowlwdge}; 

}

async function getComicsByPage(pageNum){
    checkNumber(pageNum)
    pageNum = pageNum - 1 
    // calculating page num
    let offset = pageNum * 20

    // fetching data
    let urlComics = `https://gateway.marvel.com:443/v1/public/comics`;
	const {data} = await axios.get(urlComics+apiURL.apiKey+'&limit=20&offset='+offset);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {offset: data.data.offset,total:data.data.total,results:results}
    // cashing the page in redis 
    let acknowlwdge = await client.set(`comicsPage${pageNum}`, JSON.stringify(finalData));

    return {result:finalData ,message: acknowlwdge}; 

}

async function getStoriesByPage(pageNum){
    checkNumber(pageNum)
    pageNum = pageNum - 1
    // calculating page num
    let offset = pageNum * 20

    // fetching data
    let urlStories = `https://gateway.marvel.com:443/v1/public/stories`;
	const {data} = await axios.get(urlStories+apiURL.apiKey+'&limit=20&offset='+offset);
	if(!data || !data.data) throw "Something went wrong with fetching data from marvel api"
    let results = data.data.results
    if(results.length === 0 ) throw "404: No Data Found"
  
    const finalData = {offset: data.data.offset,total:data.data.total,results:results}
    // cashing the page in redis 
    let acknowlwdge = await client.set(`storiesPage${pageNum}`, JSON.stringify(finalData));

    return {result:finalData ,message: acknowlwdge}; 

}


async function getCharactersByID(ID){
    // data validation
    checkNumber(ID)
    
    const urlCharactersWithID = `https://gateway.marvel.com:443/v1/public/characters/${ID}`;
	const {data} = await axios.get(urlCharactersWithID+apiURL.apiKey);
	if(data.status == 404) throw "Invalid character ID"
    let Results = data.data.results
    let resultString = JSON.stringify(Results[0])

    //let listNotification = await client.rpush('recentlyViewed', resultString);

    const result = await client.lPush("recentViews", resultString)
    console.log(result)
    
    let acknowlwdge = await client.set(`character${ID}`, JSON.stringify(Results));

    return {result:Results[0],message: acknowlwdge}; // this will be the array of people objects
}

async function getComicsByID(ID){
    // data validation
    checkNumber(ID)

    const urlComicsWithID = `https://gateway.marvel.com:443/v1/public/comics/${ID}`;
	const {data} = await axios.get(urlComicsWithID+apiURL.apiKey);
	if(data.status == 404) throw "Invalid character ID"
    let Results = data.data.results
    
    let acknowlwdge = await client.set(`comics${ID}`, JSON.stringify(Results));
    

    return {result:Results[0],message: acknowlwdge}; // this will be the array of people objects
}

async function getStoriesByID(ID){
    // data validation
    checkNumber(ID)

    const urlStoriesWithID = `https://gateway.marvel.com:443/v1/public/stories/${ID}`;
	const {data} = await axios.get(urlStoriesWithID+apiURL.apiKey);
	if(data.status == 404) throw "Invalid stories ID"
    let Results = data.data.results
    
    let acknowlwdge = await client.set(`stories${ID}`, JSON.stringify(Results));
    

    return {result:Results[0],message: acknowlwdge}; // this will be the array of people objects
}


async function characterRecentlyViewed(){
    let result = await client.lRange("recentViews", 0, 19)

let jsonResult = []
for(i in result){
    let temp = JSON.parse(result[i])
    jsonResult.push(temp)
}
//let jsonResult =  JSON.parse(result) 
    return jsonResult
}

function checkNumber(number){  //need to complete this
    if(!number) throw "Input must be provided"
    if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
    number = Number(number) // Convert string to Int
	if(number == NaN)	throw "ID Must Be a Number";
    if(!Number.isInteger(number)) throw " ID Must Be an Integer"
    if (typeof number !== "number") throw 'input must be a number';
}

function checkSearchTerm(searchTerm){
    if(!searchTerm) throw "Input must be provided"
    if (typeof searchTerm !== "string") throw 'input must be a number';
    if (searchTerm.trim().length === 0)
            throw 'Input cannot be just spaces';
    
    return searchTerm.trim()
}



module.exports = {
    getCharactersByID,
    getComicsByID,
    getStoriesByID,
    characterRecentlyViewed,
    checkNumber,
    getCharactersByPage,
    getComicsByPage,
    getStoriesByPage,
    getCharactersBySearch,
    getComicsBySearch,
    getStoriesBySearch,
    checkSearchTerm

}