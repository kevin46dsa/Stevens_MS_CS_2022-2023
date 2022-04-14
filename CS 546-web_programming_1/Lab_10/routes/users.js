const express = require('express');
const router = express.Router();
const data = require('../data/users');
const dataVal = require("../data/dataValidation");


router.get('/', async (req,res) =>{

    //if user authenticated redirect to /private
    if (req.session.user) {
        res.status(200).redirect("/private"); 
    }
    else res.status(200).render('view/login', {title: 'Login'});

});

router.get('/signup', async (req,res) => {
    if (req.session.user) {
        res.status(200).redirect("/private"); 
    }
    res.status(200).render('view/signup', {title: 'Sign up'});   

     
});

router.post('/signup', async (req,res) =>{
    try{
    if(!req.body.username)throw 'Please enter Username';   
    if(!req.body.password) throw "Please enter Password";
    var username = req.body.username;
    var password = req.body.password;
    // datavalidation for both
    username = dataVal.checkUsername(username); //check username returns 
    dataVal.checkPassword(password); //check password doesnot return
    }
    catch(e){
      return res.status(400).render('view/signup', {title: 'Sign up',Error: e});     
    }
    //if true
    try{
    var insertedBool = await data.createUser(username,password);
    }
    catch(e){
        return res.status(400).render('view/signup', {title: 'Sign up',Error: e}); 
    }
    try{
    if(insertedBool.userInserted === true){
        res.status(200).redirect("/"); 
    }
    else res.status(500).render('view/error',{title:"Error",error:"Internal Server Error"})
    }
    catch(e){
        return res.status(400).render('view/signup', {title: 'Sign up',Error: e}); 
    }
    
})

router.post('/login',async (req, res) => {
    try{
    if(!req.body.username)throw 'Please enter Username';   
    if(!req.body.password) throw "Please enter Password";
    var username = req.body.username;
    var password = req.body.password;

    // datavalidation for both
    username = dataVal.checkUsername(username);
    dataVal.checkPassword(password);
    }
    catch(e) {
        return res.status(400).render('view/login', {title: 'Login',Error: e});
    }
    try{
    var checkBool = await data.checkUser(username,password);
    }
    catch(e){
        return res.status(400).render('view/login', {title: 'Login',Error: e});
    }
    // create cookie
    if(checkBool.authenticated === true){
    req.session.user = {'username': username};
    res.status(200).redirect('/private');
    }
 

});

router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    res.status(200).render('view/logout', {title: 'Come Back Soon'});
    }
    else res.status(400).render('view/error',{title:"Error",error:"User Not logged in Please Login"})
      
  });

module.exports = router;


