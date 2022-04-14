const express = require('express');
const router = express.Router();

router.get('/', async (req,res) =>{
    let user = req.session.user
    let username = user.username;
    res.status(200).render('view/private', {title: 'Private', userName: username})
    
})

module.exports = router;