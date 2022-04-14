const ApiRoutes = require("./tvmazeapi");


const constructorMethod = app => {
  
  app.use("/", ApiRoutes);
  
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;