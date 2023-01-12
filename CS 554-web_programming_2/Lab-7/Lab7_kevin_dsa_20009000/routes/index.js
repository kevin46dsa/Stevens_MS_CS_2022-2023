

const constructorMethod = (app) => {
  app.get("/", (req,res)=>{
    try{
        return res.status(200).render("data/test",{title: "Shoe Fly"})
    }
    catch(e){
        return res.status(404).json({error: e})
    }
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;