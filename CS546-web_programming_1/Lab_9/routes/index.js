const Routes = require("./staticroute");


const constructorMethod = app => {
  
  app.use("/", (req, res) => {
    res.render("prime/static", {});
  });
  
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;