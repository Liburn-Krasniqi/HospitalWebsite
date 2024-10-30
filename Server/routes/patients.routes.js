module.exports = app => {
    const patients = require("../controllers/patients.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", patients.create);

    router.get("/", patients.read);

    // router.put("/", persons.update); //is it needed?

    router.delete("/",patients.delete);

  
    app.use('/api/patients', router);
  };