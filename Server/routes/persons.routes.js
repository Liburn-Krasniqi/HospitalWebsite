module.exports = app => {
    const persons = require("../controllers/persons.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", persons.findAll);
  
    app.use('/api/persons', router);
  };