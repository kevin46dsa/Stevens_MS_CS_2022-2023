const express = require('express');
const router = express.Router();



router.get('/', async (req,res) =>{
    try{
     res.status(200).render('view/static', {title: 'Show Finder'});
    }
    catch(e){
        res.status(404)
    }
});
module.exports = router;