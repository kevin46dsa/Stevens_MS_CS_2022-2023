const router = require('express').Router();
const data = require('../data/api')

//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');


router.get('/characters/search/:searchterm', async (req, res) => {
    try{
    
        //data validation  for id 
        //data.checkNumber(req.params.searchterm)
    
        let characterDataBySearch = await data.getCharactersBySearch(req.params.searchterm);
        res.status(200).json(characterDataBySearch.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

router.get('/comics/search/:searchterm', async (req, res) => {
    try{
       
         //data validation  for id 
        //data.checkNumber(req.params.searchterm)
    
        let ComicsDataBySearch = await data.getComicsBySearch(req.params.searchterm);
        res.status(200).json(ComicsDataBySearch.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

router.get('/stories/search/:searchterm', async (req, res) => {
    try{
    
        //data validation  for id 
        //data.checkNumber(req.params.searchterm)
    
        let StoriesDataBySearch = await data.getStoriesBySearch(req.params.searchterm);
        res.status(200).json(StoriesDataBySearch.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});






router.get('/characters/page/:pagenum', async (req, res) => {
    try{
        console.log('character page not in cache');
    
        //data validation  for id 
        data.checkNumber(req.params.pagenum)
    
        let characterDataByPage = await data.getCharactersByPage(req.params.pagenum);
        console.log(characterDataByPage.message);
        res.status(200).json(characterDataByPage.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

router.get('/comics/page/:pagenum', async (req, res) => {
    try{
        console.log('comics page not in cache');
    
        //data validation  for id 
        data.checkNumber(req.params.pagenum)
    
        let comicsDataByPage = await data.getComicsByPage(req.params.pagenum);
        console.log(comicsDataByPage.message);
        res.status(200).json(comicsDataByPage.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

router.get('/stories/page/:pagenum', async (req, res) => {
    try{
        console.log('stories page not in cache');
    
        //data validation  for id 
        data.checkNumber(req.params.pagenum)
    
        let storiesDataByPage = await data.getStoriesByPage(req.params.pagenum);
        console.log(storiesDataByPage.message);
        res.status(200).json(storiesDataByPage.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});




router.get('/characters/history', async (req, res) => {
    try{   
    let characterdata = await data.characterRecentlyViewed();
    res.status(200).json(characterdata);
}
catch(e){
    res.status(404).json({"Error": e});
}
});


router.get('/characters/:id', async (req, res) => {
    try{
    console.log('character not in cache');

    //data validation  for id 
    data.checkNumber(req.params.id)

    let characterDataByID = await data.getCharactersByID(req.params.id);
    console.log(characterDataByID.message);
    console.log(characterDataByID.list)
    res.status(200).json(characterDataByID.result);
    }
    catch(e){
        res.status(404).json({"Error": e});
    }
});



router.get('/comics/:id', async (req, res) => {
    try{
        console.log('comics not in cache');
    
        //data validation  for id 
        data.checkNumber(req.params.id)

        let comicDataByID = await data.getComicsByID(req.params.id);
        console.log(comicDataByID.message);
        
        res.status(200).json(comicDataByID.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

router.get('/stories/:id', async (req, res) => {
    try{
        console.log('stories not in cache');
    
        //data validation  for id 
        data.checkNumber(req.params.id)

        let storieDataByID = await data.getStoriesByID(req.params.id);
        console.log(storieDataByID.message);
        
        res.status(200).json(storieDataByID.result);
        }
        catch(e){
            res.status(404).json({"Error": e});
        }
});

module.exports = router;