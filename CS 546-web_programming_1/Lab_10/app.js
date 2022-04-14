const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

app.use(express.json());
app.use("/public", static);
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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


app.use('/private', (req, res, next) => { //add try catch
  
  if (!req.session.user) {
    return res.status(403).render('view/error', {title:"Error", restrictedAccess: true}); //create error view
  } else {
    next();
  }
});


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});