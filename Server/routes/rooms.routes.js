module.exports = app => {
    const rooms = require("../controllers/rooms.controller.js");
  
    var router = require("express").Router();
    
    router.post("/", rooms.create);
 /** GET Methods */
    /**
     * @openapi
     * '/api/rooms':
     *  get:
     *     tags:
     *     - Room Controller
     *     summary: Get all rooms
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    router.get("/", rooms.read);

    router.put("/", rooms.update);

    router.delete("/",rooms.delete);

    app.use('/api/rooms', router);
  };