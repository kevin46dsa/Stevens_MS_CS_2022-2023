const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const configRoutes = require("./routes");
const session = require('express-session');
const data = require("./data/userFunctions")
const dataVal = require("./data/dataValidation")


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(
    session({
      name: 'AuthCookieTest',
      secret: "some secret string!",
      saveUninitialized: true,
      resave: false
      
    })
  );


  // logging middle ware
app.use(async(req,res,next)=>{
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;

    let authenticated = undefined;
    if (req.session.user) authenticated = true;
    else authenticated = false; 

    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`) // add the check foruser authentication
    next();
} )


app.use('/sweets', async(req, res, next) => { 
  let method = req.method;
  let user = req.session.user
  let route = req.originalUrl;
  let flagMethods = ["POST","PATCH","DELETE"];
  let ignoreroutes = ['login','signup'];
    if(flagMethods.includes(method)){
      let temproute = route.split("/")
      if (!ignoreroutes.includes(temproute[2])){
      if(user){
        if(method == "DELETE"){
          try {
            temproute[2] = dataVal.checkID(temproute[2])
            temproute[3] = dataVal.checkID(temproute[3])
            let replyFlag = await data.verifyReplyUser(temproute[2],temproute[3],user)
            if(!replyFlag) throw " User Not Authorised to DELETE"
          } catch (error) {
            return res.status(400).json({Error: error});
          }
        }
        else if(method == "PATCH"){
          try {
            temproute[2] = dataVal.checkID(temproute[2]) 
          let sweetFlag = await data.verifySweetUser(temproute[2],user)
          if(!sweetFlag) throw " User Not Authorised to EDIT"
        } catch (error) {
          return res.status(400).json({Error: error});
        }
        }
      }
      else {
      return res.status(400).json({Error: "User Not Logged IN"});
      }
    }
  }
  next();
});




/*
app.use('/sweets', async(req, res, next) => { //add try catch
  let method = req.method;
  let user = req.session.user
  let route = req.originalUrl;
  let flagMethods = ["POST","PATCH","DELETE"];
  let ignoreroutes = ['login','signup'];
    if(flagMethods.includes(method)){
      let temproute = route.split("/")
      if (!ignoreroutes.includes(temproute[2])){
      if(user){
        if(method == "PATCH"){
          //data validation 
          let sweetFlag = await data.verifySweetUser(temproute[2],user)
          if(!sweetFlag) res.status(400).json({Error: "User not Authorised to Edit"});
        }
      }
      else {
      return res.status(400).json({Error: "User Not Logged IN"});
      }
    }
  }
  next();
});
*/
/*
app.use('/sweets/:sweetid', async (req, res, next) => { //add try catch
  let method = req.method;
  let flagMethods = ["POST", "DELETE"];
  let route = req.originalUrl;
  
  try{
    if(flagMethods.includes(method)){
      if (!req.session.user) throw "User Not Logged In";
      if (method === "DELETE") {
        let replyID = route.slice(1).split("/")
        let replyFlag = await data.verifyUser(replyID[1],replyID[2],req.session.user)
        if(!replyFlag) throw "No Reply with that ID or not authorised to delete Reply"
        next()
      }
      next()
  }
}
  catch(e){
      res.status(400).json({Error: e});
  }
});

*/

  configRoutes(app);
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});