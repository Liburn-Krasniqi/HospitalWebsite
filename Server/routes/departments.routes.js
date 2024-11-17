module.exports = app => {
    const departments = require("../controllers/department.controller.js");
  
    var router = require("express").Router();
    
    // router.post("/", departments.create);

    router.get("/", departments.read);

    // router.put("/", persons.update); //is it needed?

    // router.delete("/",departments.delete);

  
    app.use('/api/departments', router);
  };