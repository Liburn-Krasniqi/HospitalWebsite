module.exports = app => {
    const services = require("../controllers/services.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.post("/", services.create);
    
    router.get("/", services.read);

    router.put("/",services.update);

    router.delete("/",services.delete);
  
    app.use('/api/services', router);
  };