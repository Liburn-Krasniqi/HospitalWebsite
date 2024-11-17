module.exports = app => {
    const rooms = require("../controllers/rooms.controller.js");
  
    var router = require("express").Router();
 /** POST Methods */
    /**
     * @openapi
     * '/api/rooms':
     *  post:
     *     tags:
     *     - Room Controller
     *     summary: Create a new room, Department is optional
     *     requestBody:
     *      required: false
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              DeptId:
     *                type: integer
     *                default: null
     *     responses:
     *      200:
     *        description: Created Successfully
     *      400:
     *        description: Bad Request
     *      403:
     *        description: Not Allowed
     *      500:
     *        description: Server Error
     */    
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
/** PUT Methods */
    /**
     * @openapi
     * '/api/rooms?RoomID={roomId}':
     *  put:
     *     tags:
     *     - Room Controller
     *     summary: Modify a room
     *     parameters:
     *      - name: RoomID
     *        in: query 
     *        description: The unique Id of the room
     *        required: true
     *     requestBody:
     *      required: false
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              DeptId:
     *                type: integer
     *                default: null
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    router.put("/", rooms.update);
/** DELETE Methods */
    /**
     * @openapi
     * '/api/rooms?RoomID={roomID}':
     *  delete:
     *     tags:
     *     - Room Controller
     *     summary: Delete Room by Id
     *     parameters:
     *      - name: RoomID
     *        in: query 
     *        description: The unique Id of the room
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    router.delete("/",rooms.delete);

    app.use('/api/rooms', router);
  };