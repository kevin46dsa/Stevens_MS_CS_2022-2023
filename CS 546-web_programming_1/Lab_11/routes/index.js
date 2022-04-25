const staticRoutes = require('./static');

const constructorMethod = (app) => {
  app.use('/', staticRoutes);
  
  

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;