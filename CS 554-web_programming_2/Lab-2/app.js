const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const configRoutes = require("./routes");
//const data = require("./data/userFunctions")
const dataVal = require("./data/api")
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({extended: true}));


  // logging middle ware
app.use(async(req,res,next)=>{
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;
    
    let authenticated = undefined;
    //if (req.session.user) authenticated = true;
   // else authenticated = false; 
    
    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`) // add the check foruser authentication
    next();
} )


app.use('/api/characters/:id', async (req, res, next) => {
  //lets check to see if we have the show detail page for this show in cache
  try{
    let ID = req.params.id
    
    if(req.params.id !== "history") dataVal.checkNumber(ID)
    let exists = await client.exists(`character${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('character in Cache');
      let character = await client.get(`character${ID}`);
      let temp = JSON.parse(character) 
      temp = JSON.stringify(temp[0])
      const result = await client.lPush("recentViews", temp)
      if(result) console.log("Adding character to recentlyViewed")
      console.log('Sending character from Redis....');
      character =  JSON.parse(character) 
      
      res.status(200).json(character[0]);
    } else {
      next();
    }
  } 
  catch(e){
    
      res.status(404).json({"Error": e});
  }  
  /*
  let ID = req.params.id
    dataVal.checkNumber(ID)
    let exists = await client.exists(`character${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('character in Cache');
      let character = await client.get(`character${ID}`);
      let temp = JSON.parse(character) 
      temp = JSON.stringify(temp[0])
      const result = await client.lPush("recentViews", temp)
      if(result) console.log("Adding character to recentlyViewed")
      console.log('Sending character from Redis....');
      character =  JSON.parse(character) 
      
      res.status(200).json(character[0]);
    } else {
      next();
    }
    */
});

app.use('/api/comics/:id', async (req, res, next) => {
    //lets check to see if we have the show detail page for this show in cache
   try{
    let ID = req.params.id
    dataVal.checkNumber(ID)
    let exists = await client.exists(`comics${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('Show in Cache');
      let comics = await client.get(`comics${ID}`);
      console.log('Sending comics from Redis....');
      comics =  JSON.parse(comics) 
      res.status(200).json(comics[0]);
    } else {
      next();
    }
  } 
  catch(e){
    
      res.status(404).json({"Error": e});
  }  
  });
  
  app.use('/api/stories/:id', async (req, res, next) => {
    try{
    //lets check to see if we have the show detail page for this show in cache
    let ID = req.params.id
    dataVal.checkNumber(ID)
    let exists = await client.exists(`stories${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('Show in Cache');
      let stories = await client.get(`stories${ID}`);
      console.log('Sending stories from Redis....');
      stories =  JSON.parse(stories) 
      res.status(200).json(stories[0]);
    } else {
      next();
    }
  }
    catch(e){
    
      res.status(404).json({"Error": e});
  } 
  });

  configRoutes(app);
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});