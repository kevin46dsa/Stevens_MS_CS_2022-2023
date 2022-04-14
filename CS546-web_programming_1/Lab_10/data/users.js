const mongoCollections = require('../config/mongoCollection');
const allUsers = mongoCollections.users;
const bcrypt = require("bcryptjs");
const dataVal = require("./dataValidation")



module.exports = {
    async createUser(username, password){
        let newUsername = username;
        let newPassword = password;
        if(!newUsername) throw "No Username";
        if(!newPassword) throw "No Password";
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
            username: newUsername,
            password: hash
        };

        const insertInfo = await userCollection.insertOne(newUser);

        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw " User was unable to Sign up MongoDB Server Error"; // Not sure about this part confirm once
        else return {userInserted: true};

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
        if(passwordMatch) return {authenticated: true};
        else throw "Either the username or password is invalid";

    }
};