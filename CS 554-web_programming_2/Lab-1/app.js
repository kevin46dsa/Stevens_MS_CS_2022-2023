const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const configRoutes = require("./routes");



app.use((req, res, next) =>{
    let data = req.path+req.method
    if(!urlCount[data]) urlCount[data] = 0
    urlCount[data]+=1;
    console.log("###################################################")
    console.log("URL PATH: ",req.originalUrl)
    console.log("HTTP METHOD/VERB: ",req.method)
    console.log("No. of times URL requested: ",urlCount[data])
    console.log("Request Body: ",req.body)
    console.log("###################################################")
    next();
  });
  
  //middleware to check if the user is logged in or no 
  app.use("/sweets",(req, res, next) => {
    if (req.method === 'POST') {
        // do stuff
    }

    return next()
})
  

  configRoutes(app);
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});