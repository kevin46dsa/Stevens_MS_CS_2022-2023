const router = require('express').Router();

const data = require('../data/userFunctions');
const dataVal = require('../data/dataValidation');
//const { route } = require('express/lib/router');
//var xss = require('xss');


router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    res.status(200).json({LoggedOut: 'Come Back Soon'});
    }
    else res.status(400).json({error:"User Not logged in Please Login"})
      
});

  router.post('/signup', async (req,res) =>{
    try{
	if(req.session.user) throw " User is already Logged In"
    if(!req.body.username)throw 'Please enter Username';   
    if(!req.body.password) throw "Please enter Password";
	if(!req.body.name) 'Please enter name';
    var username = req.body.username;
    var password = req.body.password;
	var name = req.body.name;
    // datavalidation for both
	name = dataVal.checkName(name);
    username = dataVal.checkUsername(username); //check username returns 
    dataVal.checkPassword(password); //check password doesnot return
    }
    catch(e){
      return res.status(400).json({Error: e});     
    }
    //if true
    try{
    var insertedBool = await data.createUser(username,name, password);
    }
    catch(e){
        return res.status(400).json({Error: e});  
    }
    try{
    if(insertedBool.userInserted === true){
		// find a way to get the data from the database and display it

        res.status(200).json({...insertedBool.userInfo}); 
    }
    else res.status(500).json({error:"Internal Server Error"})
    }
    catch(e){
		return res.status(400).json({Error: e});  
    }
    
})

router.post('/login',async (req, res) => {
    try{
	if(req.session.user) throw " User is already Logged In"
    if(!req.body.username)throw 'Please enter Username';   
    if(!req.body.password) throw "Please enter Password";
    var username = req.body.username;
    var password = req.body.password;

    // datavalidation for both
    username = dataVal.checkUsername(username);
    dataVal.checkPassword(password);
    }
    catch(e) {
        return res.status(400).json({Error: e});  
    }
    try{
    var checkBool = await data.checkUser(username,password);
    }
    catch(e){
        return res.status(400).json({Error: e});  
    }
    // create cookie
    if(checkBool.authenticated === true){
    req.session.user = {'username': checkBool.userInfo.username, "_id":checkBool.userInfo._id};
	console.log(req.session.user)
    res.status(200).json({...checkBool.userInfo});
    }
 

});

router.get('/', async (req, res) => {
	try{
		if(!req.query.page) {
			let sweetFound = await data.getSweets('1');
			res.status(200).json(sweetFound);
		}
		else{
			let pagenum = req.query.page
			dataVal.checkPageNumRoute(pagenum)
			let sweetFound = await data.getSweets(pagenum);
			if(sweetFound.length !== 0 &&  sweetFound){
				res.status(200).json(sweetFound);
			}
			else res.status(404).json({Error: "No More Sweets"}); 
		}	
	}
	catch(e){
		return res.status(400).json({Error: e});     
	}

});

router.get('/:id', async (req, res) => {
	try {
		req.params.id = dataVal.checkID(req.params.id);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	try {
		const sweetbyid = await data.getSweetByID(req.params.id);
		res.status(200).json(sweetbyid);
	} catch (e) {
		res.status(404).json({ error: e });
	}
})

router.post('/', async (req, res) => {
	
	//user needs to be logged 
	//let loggedInUserData = req.session.user   // this needs to be checked if it exists in the middle ware
	if(!req.session.user) throw "User is not Logged in"
	var loggedInUserData = req.session.user

	let sweetInfo = req.body;
		try {
			if (
				!sweetInfo.sweetText ||
				!sweetInfo.sweetMood 
			)
				throw 'All fields need to be entered';
				sweetInfo.sweetText = dataVal.checkString(sweetInfo.sweetText);
				sweetInfo.sweetMood = dataVal.checkString(sweetInfo.sweetMood);
			
		} catch (e) {
			return res.status(400).json({ error: e });
		}
		try {
			const newSweet = await data.createSweet(
				sweetInfo.sweetText,
				sweetInfo.sweetMood,
				loggedInUserData
				
			);
			if(newSweet.sweetInserted) res.status(200).json(newSweet.sweetData);
			else res.status(400).json({ error: e });
		} catch (e) {
			return res.status(400).json({ error: e });
		}
	});


router.patch('/:id', async (req, res) => {
	// not all fields are required in the request body
	// only 2 fields can be updated or patched
	if(!req.session.user) throw "User is not Logged in"
	var loggedInUserData = req.session.user

	try{
		if(!req.params.id) throw "Please enter Sweet ID"
		if(!loggedInUserData) throw "user not logged in"
		if(!req.body.sweetText) var sweetText = undefined
		else {
			sweetText = req.body.sweetText
			sweetText = dataVal.checkString(sweetText)
		}
		if(!req.body.sweetMood) var sweetMood = undefined
		else {
			sweetMood = req.body.sweetMood
			sweetMood = dataVal.checkString(sweetMood)
            sweetMood = sweetMood.toLowerCase();
            let Moods = ["happy","sad","angry","excited","surprised","loved","blessed","greatful","blissful","silly","chill","motivated","emotional","annoyed","lucky","determined","bored","hungry","disappointed","worried"]
            if(!Moods.includes(sweetMood)) throw "Invalid Mood Error"
		}
		// data Validation
		var sweetID = req.params.id
		var userData = loggedInUserData
		sweetID = dataVal.checkID(sweetID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)
		
		}
		catch(e) {
			return res.status(400).json({Error: e});
		}
		try{
		var patchSweet = await data.patchSweet(sweetID,userData,sweetMood,sweetText);
		res.status(200).json(patchSweet);
		}
		catch(e){
			return res.status(400).json({Error: e});
		}
})

router.post('/:id/replies', async (req, res) => {
	if(!req.session.user) throw "User is not Logged in"
	var loggedInUserData = req.session.user

	try{
		if(!req.params.id) throw "Please enter Sweet ID"
		if(!req.body.reply) throw "Please enter a Reply"
		if(!loggedInUserData) throw "user not logged in"
		// data Validation
		var sweetID = req.params.id
		var userData = loggedInUserData
		var reply = req.body.reply
		sweetID = dataVal.checkID(sweetID);
		reply = dataVal.checkString(reply);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)
		}
		catch(e) {
			return res.status(400).json({Error: e});
		}
		try{
		var sweetReply = await data.sweetReply(sweetID,reply,userData);
		res.status(200).json(sweetReply);
		}
		catch(e){
			return res.status(400).json({Error: e});
		}
		
})

router.delete('/:sweetId/:replyId', async (req, res) => {
	if(!req.session.user) throw "User is not Logged in"
	var loggedInUserData = req.session.user

	try{
		if(!req.params.sweetId) throw "Please enter Sweet ID"
		if(!req.params.replyId) throw "Please enter Reply ID"
		if(!loggedInUserData) throw "user not logged in"
		// data Validation
		var sweetID = req.params.sweetId
		var replyID = req.params.replyId
		var userData = loggedInUserData
		sweetID = dataVal.checkID(sweetID);
		replyID = dataVal.checkID(replyID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)
		}
		catch(e) {
			return res.status(400).json({Error: e});
		}
		try{
		var replyDeleted = await data.deleteReply(sweetID,replyID,userData);
		res.status(200).json(replyDeleted);
		}
		catch(e){
			return res.status(400).json({Error: e});
		}
		
})

router.post('/:id/likes', async (req, res) => {
	if(!req.session.user) throw "User is not Logged in"
	var loggedInUserData = req.session.user

	try{
		if(!req.params.id) throw "Please enter Sweet ID"
		if(!loggedInUserData) throw "user not logged in"
		// data Validation
		var sweetID = req.params.id
		var userData = loggedInUserData
		sweetID = dataVal.checkID(sweetID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)
		}
		catch(e) {
			return res.status(400).json({Error: e});
		}
		try{
		var sweetLiked = await data.sweetLiked(sweetID,userData);
		res.status(200).json(sweetLiked);
		}
		catch(e){
			return res.status(400).json({Error: e});
		}
		
})




module.exports = router;

