module.exports = app => {
    const rooms = require("../controllers/rooms.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", rooms.create);

    router.get("/", rooms.read);

    router.put("/", rooms.update);

    router.delete("/",rooms.delete);

    app.use('/api/rooms', router);
  };