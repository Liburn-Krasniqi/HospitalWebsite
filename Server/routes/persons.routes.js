module.exports = app => {
    const persons = require("../controllers/persons.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", persons.create);

    router.get("/", persons.read);

    router.put("/", persons.update);

    router.delete("/",persons.delete);

    app.use('/api/persons', router);
  };