const md5 = require('blueimp-md5');
const publickey = '51c87b41ac01d91067e355a40afe40e3';
const privatekey = '1844c1dc2110c3df76947908b8c7957c3ae162c2';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrlCharacters = 'https://gateway.marvel.com:443/v1/public/characters';
const baseUrlComics = 'https://gateway.marvel.com/v1/public/comics';
const baseUrlStories = 'https://gateway.marvel.com/v1/public/stories';


const urlCharacters = baseUrlCharacters + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
const urlComics = baseUrlComics + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
const urlStories = baseUrlStories + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

const apikey = '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


module.exports = {
    characters: urlCharacters,
    comics: urlComics,
    stories : urlStories,
    apiKey: apikey
};