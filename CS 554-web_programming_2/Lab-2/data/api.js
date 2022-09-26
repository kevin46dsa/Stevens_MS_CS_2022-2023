const axios = require('axios');
const apiURL = require('../config')
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});


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
console.log(result)
let jsonResult = []
for(i in result){
    let temp = JSON.parse(result[i])
    jsonResult.push(temp)
}
//ßlet jsonResult =  JSON.parse(result) 
    return jsonResult
}

function checkNumber(number){  //need to complete this
    if(!number) throw "Input must be provided"
    if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
    number = Number(number) // Convert string to Int
	if(!number)	throw "ID Must Be a Number";
    if(!Number.isInteger(number)) throw " ID Must Be an Integer"
    if (typeof number !== "number") throw 'input must be a number';
}



module.exports = {
    getCharactersByID,
    getComicsByID,
    getStoriesByID,
    characterRecentlyViewed,
    checkNumber
}