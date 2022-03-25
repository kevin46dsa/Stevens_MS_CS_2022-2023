const ApiRoutes = require("./tvmazeapi");
const path = require("path");

const constructorMethod = app => {
  
  app.use("/", ApiRoutes);
  
  
  //app.get("/about", (req, res) => {
  //  res.sendFile(path.resolve("static/index.html"));
  //});

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;