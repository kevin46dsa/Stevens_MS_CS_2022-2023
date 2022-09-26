const router = require('express').Router();
const data = require('../data/api')

//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');

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