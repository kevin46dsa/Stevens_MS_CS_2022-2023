const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const configRoutes = require("./routes");
const session = require('express-session');


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(
    session({
      name: 'AuthCookie',
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
    // check if user is authenticated or no ??
    if (req.session.user) authenticated = true;
    else authenticated = false; 

    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`) // add the check foruser authentication
    next();
} )


app.use('sweets', (req, res, next) => { //add try catch


    if (req.method === 'POST'){}; // for specific request method
  
  
    if (!req.session.user) { //to check if user is authenticated in or no 
    return res.status(403).json({User: "Not Authenticated Access Denied"}); //create error view
  } else {
    next();
  }
});

  

  configRoutes(app);
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});