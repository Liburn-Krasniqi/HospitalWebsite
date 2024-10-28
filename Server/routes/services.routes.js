module.exports = app => {
    const services = require("../controllers/services.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", services.findAll);
  
    app.use('/api/services', router);
  };