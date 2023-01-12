const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;
const configRoutes = require("./routes");
//const data = require("./data/userFunctions")
const cors = require('cors');

const dataVal = require("./data/api")
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
const whitelist = ["https://betclient.herokuapp.com","http://localhost:3000"]; //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
*/
app.use(cors());
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

app.use('/api/characters/page/:pagenum', async (req, res, next) => {
  try{
    let ID = req.params.pagenum - 1
    if(typeof req.params.pagenum == "number") dataVal.checkNumber(ID)
    let exists = await client.exists(`characterPage${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('character page in Cache');
      let characterPage = await client.get(`characterPage${ID}`);
      characterPage = JSON.parse(characterPage) 
      
      console.log('Sending character Page from Redis....');
      
      res.status(200).json(characterPage);
    } else {
      next();
    }
  } 
  catch(e){
    
      res.status(404).json({"Error": e});
  }  

})
app.use('/api/comics/page/:pagenum', async (req, res, next) => {
  try{
    let ID = req.params.pagenum - 1
    if(typeof req.params.pagenum == "number") dataVal.checkNumber(ID)
    let exists = await client.exists(`comicsPage${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('comics page in Cache');
      let comicsPage = await client.get(`comicsPage${ID}`);
      comicsPage = JSON.parse(comicsPage) 
      
      console.log('Sending comics Page from Redis....');
      
      res.status(200).json(comicsPage);
    } else {
      next();
    }
  } 
  catch(e){
    
      res.status(404).json({"Error": e});
  }  

})
app.use('/api/stories/page/:pagenum', async (req, res, next) => {
  try{
    let ID = req.params.pagenum - 1
    if(typeof req.params.pagenum == "number") dataVal.checkNumber(ID)
    let exists = await client.exists(`storiesPage${ID}`);
    if (exists) {
      //if we do have it in cache, send the raw html from cache
      console.log('stories page in Cache');
      let storiesPage = await client.get(`storiesPage${ID}`);
      storiesPage = JSON.parse(storiesPage) 
      
      console.log('Sending stories Page from Redis....');
      
      res.status(200).json(storiesPage);
    } else {
      next();
    }
  } 
  catch(e){
    
      res.status(404).json({"Error": e});
  }  

})

app.use('/api/characters/:id', async (req, res, next) => {
  //lets check to see if we have the show detail page for this show in cache
  try{
    let ID = req.params.id
    
    if(typeof req.params.id == "number") dataVal.checkNumber(ID)
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

});

app.use('/api/comics/:id', async (req, res, next) => {
    //lets check to see if we have the show detail page for this show in cache
   try{
    let ID = req.params.id
    if(typeof req.params.id == "number")dataVal.checkNumber(ID)
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
    if(typeof req.params.id == "number")dataVal.checkNumber(ID)
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