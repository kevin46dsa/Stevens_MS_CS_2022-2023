

const mongoCollections = require('../config/mongoCollection');
const allUsers = mongoCollections.users;
const allSweets = mongoCollections.sweet;
const bcrypt = require("bcryptjs");
const dataVal = require("./dataValidation")
const { ObjectId } = require('mongodb');

module.exports = {
    async createUser(username, name, password){
        let newUsername = username;
        let newPassword = password;
        let newName = name;
        if(!newUsername) throw "No Username";
        if(!newPassword) throw "No Password";
        if(!newName) throw "No Name";
        
        newName = dataVal.checkName(newName);
        newUsername = dataVal.checkUsername(newUsername);
        newUsername = newUsername.toLowerCase(); // Makes every usernamecase insensitive
        
        // Password validation
        dataVal.checkPassword(password); 
        //.toArray()
        //not allow duplicate usernames
        const userCollection = await allUsers();
        const userFound = await userCollection.findOne({'username': newUsername});
        if (userFound) throw "User with this username already exists";

        //convert password to hashed password
        const hash = await bcrypt.hash(password, 16);

        // insert username and pass to db
        let newUser = {
            name: newName,
            username: newUsername,
            password: hash
        };

        const insertInfo = await userCollection.insertOne(newUser);

        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw " User was unable to Sign up MongoDB Server Error"; // Not sure about this part confirm once
        else {
            // check if i need to send password as well ?
            const userFound = await userCollection.findOne({'username': newUsername});
            delete(userFound.password); 
            userFound._id = userFound._id.toString()
            return {userInserted: true, userInfo: userFound};
        }
        
        

    },

    async checkUser(username, password){
        if(!username) throw "No Username";
        if(!password) throw "No Password";
        username = dataVal.checkUsername(username);
        username = username.toLowerCase();
        dataVal.checkPassword(password);

        // query only username first if not there throw "Either the username or password is invalid"
        const userCollection = await allUsers();
       
        const userFound = await userCollection.findOne({'username': username});
        
        if (userFound === null) throw "Either the username or password is invalid";

        // if match
        //check if the password is a match using bycrypt else throw "Either the username or password is invalid"
        let passwordMatch = await bcrypt.compare(password, userFound.password);
        if(passwordMatch) {
            delete(userFound.password); 
            userFound._id = userFound._id.toString()
            return {authenticated: true, userInfo:userFound};
        }
            else throw "Either the username or password is invalid";

    },

    async postSweets(){



        let newSweet = {
            sweetText: newName,
            sweetMood: newUsername,
            userThatPosted: {},
            replies:[],
            likes:[]
        };





    },

    async getSweets(pagenum){

            pagenum = dataVal.checkPageNum(pagenum)
            const sweetCollection = await allSweets();
            let skipnum = (50 * pagenum)-50
            const sweetFound = await sweetCollection.find({}).skip(skipnum).limit(50).toArray()
            return sweetFound
            
    },

    async getSweetByID(ID){
        if (!ID) throw 'You must provide an id to search for';
		ID = dataVal.checkID(ID)
        const sweetCollection = await allSweets();
		const sweetFound = await sweetCollection.findOne({ _id: ObjectId(ID) });
        if (sweetFound === null) throw 'No sweet with that id';
		sweetFound._id = sweetFound._id.toString();
		return sweetFound;
    },

    async createSweet(sweetText,sweetMood,loggedInUserData ){
        
        if (!sweetText ||!sweetMood )throw 'All fields need to be entered';
        sweetText = dataVal.checkString(sweetText);
        sweetMood = dataVal.checkString(sweetMood);
        
        sweetMood = sweetMood.toLowerCase();
        let Moods = ["happy","sad","angry","excited","surprised","loved","blessed","greatful","blissful","silly","chill","motivated","emotional","annoyed","lucky","determined","bored","hungry","disappointed","worried"]
        if(!Moods.includes(sweetMood)) throw "Invalid Mood Error"
        
        
        const sweetCollection = await allSweets();
        
        newSweet = {
        "sweetText": sweetText,
        "sweetMood": sweetMood,
        "userThatPosted": loggedInUserData,
        "replies":[],
        "likes":[]
        }
        
        const insertInfo = await sweetCollection.insertOne(newSweet);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add sweet'; 
        else {
            const sweetFound = await sweetCollection.findOne({ _id: insertInfo.insertedId });
            sweetFound._id = sweetFound._id.toString()
            return { sweetInserted: true, sweetData: sweetFound };
        }
    
    },
    
    async sweetLiked(ID, userdata){

        if(!ID) throw "Please enter Sweet ID"
		if(!userdata) throw "user not logged in"
		// data Validation
		let sweetID = ID
		let userData = userdata
		sweetID = dataVal.checkID(sweetID);
		userData._id = dataVal.checkID(userData._id);
        // Convert Object id to string
		userData.username = dataVal.checkUsername(userData.username)
        
        
        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                if (sweetFound === null) throw 'No sweet with that id';
                
                let sweetLikes = sweetFound.likes
                
                if(!sweetLikes.includes(userData._id)){
                // add the users id to the array
                const updatedInfo = await sweetCollection.updateOne(
              { _id: ObjectId(sweetID) },
              {$push: {
                      likes: userData._id
                      }
              }
          );
          if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
			throw 'could not update sweet successfully';
		}
            sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
            sweetFound._id = sweetFound._id.toString();
            return sweetFound
        }
                else{
                      // add the users id to the array
                      const updatedInfo = await sweetCollection.updateOne(
                        { _id: ObjectId(sweetID) },
                        {$pull: {
                                likes: userData._id
                                }
                        }
                    );
                    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
                      throw 'could not update sweet successfully';
                  }
                      sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                      sweetFound._id = sweetFound._id.toString();
                      return sweetFound
                }

    },

    async sweetReply(sweetId,Reply,userdata){
        if(!sweetId) throw "Please enter Sweet ID"
		if(!Reply) throw "Please enter a Reply"
		if(!userdata) throw "user not logged in"
		// data Validation
		var sweetID = sweetId
		var userData = userdata
		var reply = Reply
		sweetID = dataVal.checkID(sweetID);
		reply = dataVal.checkString(reply);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)
        let replyID = ObjectId()
        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                if (sweetFound === null) throw 'No sweet with that id';
        
                const updatedInfo = await sweetCollection.updateOne(
              { _id: ObjectId(sweetID) },
              {$push: {
                      replies: {
                        _id: replyID,
                        userThatPostedReply: userData,
                        reply:reply
                      }
                      }
              }
          );
          if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
			throw 'could not update sweet successfully';
		}
            sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
            sweetFound._id = sweetFound._id.toString();
            return sweetFound
    },

    async deleteReply(sweetId,replyId,userdata){
        if(!sweetId) throw "Please enter Sweet ID"
		if(!replyId) throw "Please enter Reply ID"
		if(!userdata) throw "user not logged in"
		// data Validation
		var sweetID = sweetId
		var replyID = replyId
		var userData = userdata
		sweetID = dataVal.checkID(sweetID);
		replyID = dataVal.checkID(replyID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)

        // checking if sweet ID and reply ID as well as if the user logged in posted the replyexist
        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
        if (sweetFound === null) throw 'No sweet with that id';
        let allReplies = sweetFound.replies
        let replyFlag = false
        for (let x in allReplies) {

            if(allReplies[x]._id.toString() === replyID && allReplies[x].userThatPostedReply._id.toString() === userData._id) replyFlag = true
        }
        if(!replyFlag) throw "No Reply with that ID or not authorised to delete Reply"


        // delete Reply 
        const updatedInfo = await sweetCollection.updateOne(
            { _id: ObjectId(sweetID) },
            {$pull: {
                    replies: {
                      _id: ObjectId(replyID),
                    }
                    }
            }
        );
        if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
          throw 'could not update sweet successfully';
      }
          sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
          sweetFound._id = sweetFound._id.toString();
          return sweetFound
        


    },

    async patchSweet(sweetId,userdata,sweetmood,sweettext){
        if(!sweetId) throw "Please enter Sweet ID"
		if(!userdata) throw "user not logged in"
		if(!sweettext) var sweetText = undefined
		else {
			sweetText = sweettext
			sweetText = dataVal.checkString(sweetText)
		}
		if(!sweetmood) var sweetMood = undefined
		else {
			sweetMood = sweetmood
			sweetMood = dataVal.checkString(sweetMood)
            sweetMood = sweetMood.toLowerCase();
            let Moods = ["happy","sad","angry","excited","surprised","loved","blessed","greatful","blissful","silly","chill","motivated","emotional","annoyed","lucky","determined","bored","hungry","disappointed","worried"]
            if(!Moods.includes(sweetMood)) throw "Invalid Mood Error"
		}
		// data Validation
		var sweetID = sweetId
		var userData = userdata
		sweetID = dataVal.checkID(sweetID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)

        // Check if sweet exists
        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
        if (sweetFound === null) throw 'No sweet with that id';
        if (!sweetFound.userThatPosted._id.toString() === userData._id.toString()) throw "You are not Authorised to edit this Sweet"
        // verify if sweet is posted by user

        const updatedSweetText = {
			sweetText: sweetText,
			sweetMood: sweetFound.sweetMood,
			userThatPosted: sweetFound.userThatPosted,
			replies: sweetFound.replies,
			likes: sweetFound.likes
		};

        const updatedSweetMood = {
			sweetText: sweetFound.sweetText,
			sweetMood: sweetMood,
			userThatPosted: sweetFound.userThatPosted,
			replies: sweetFound.replies,
			likes: sweetFound.likes
		};

        const updatedSweetBoth = {
			sweetText: sweetText,
			sweetMood: sweetMood,
			userThatPosted: sweetFound.userThatPosted,
			replies: sweetFound.replies,
			likes: sweetFound.likes
        }

        if(sweetText && sweetMood){
            const updatedInfo = await sweetCollection.updateOne(
                { _id: ObjectId(sweetID) },
                { $set: updatedSweetBoth }
            );
            if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
                throw 'could not update sweet successfully';
            }
            else {
                sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                sweetFound._id = sweetFound._id.toString();
                return sweetFound

            }
        }
        else if(sweetText){
            const updatedInfo = await sweetCollection.updateOne(
                { _id: ObjectId(sweetID) },
                { $set: updatedSweetText }
            );
            if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
                throw 'could not update sweet successfully';
            }
            else {
                sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                sweetFound._id = sweetFound._id.toString();
                return sweetFound

            }

        }
        else {
            const updatedInfo = await sweetCollection.updateOne(
                { _id: ObjectId(sweetID) },
                { $set: updatedSweetMood }
            );
            if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
                throw 'could not update sweet successfully';
            }
            else {
                sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
                sweetFound._id = sweetFound._id.toString();
                return sweetFound

            }
        }

    },

    async verifyReplyUser(sweetId,replyId,userdata){
        if(!sweetId) throw "Please enter Sweet ID"
		if(!replyId) throw "Please enter Reply ID"
		if(!userdata) throw "user not logged in"
		// data Validation
		var sweetID = sweetId
		var replyID = replyId
		var userData = userdata
		sweetID = dataVal.checkID(sweetID);
		replyID = dataVal.checkID(replyID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)

        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
        if (sweetFound === null) throw 'No sweet with that id';
        let allReplies = sweetFound.replies
        let replyFlag = false
        for (let x in allReplies) {

            if(allReplies[x]._id.toString() === replyID && allReplies[x].userThatPostedReply._id.toString() === userData._id) replyFlag = true
        }
        if(!replyFlag) throw "No Reply with that ID or not authorised to delete Reply"

        return replyFlag
    },

    async verifySweetUser(sweetId,userdata){
        if(!sweetId) throw "Please enter Sweet ID"
		if(!userdata) throw "user not logged in"
		// data Validation
		var sweetID = sweetId
		var userData = userdata
		sweetID = dataVal.checkID(sweetID);
		userData._id = dataVal.checkID(userData._id);
		userData.username = dataVal.checkUsername(userData.username)

        const sweetCollection = await allSweets();
        let sweetFound = await sweetCollection.findOne({ _id: ObjectId(sweetID) });
        if (sweetFound === null) throw 'No sweet with that id';
        if(sweetFound.userThatPosted._id.toString() == userdata._id ) return true
        else return false

    }
}