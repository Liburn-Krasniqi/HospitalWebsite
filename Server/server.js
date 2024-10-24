import http from 'http';
// const getReq = require("./methods/get-request");
import {getReq} from './methods/get-request.js';
// const postReq = require("./methods/post-request");
// const putReq = require("./methods/put-request");
// const deleteReq = require("./methods/delete-request");
///let movies = require("./data/movies.json");
import dotenv from 'dotenv'
dotenv.config();
//require("dotenv").config()

const PORT = process.env.PORT || 5001;//just in case

const server = http.createServer((req,res) => {
    //req.movies = movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
        break;
        case "POST":
            postReq(req, res);
        break;
        case "PUT":
            putReq(req, res);
        break;
        case "DELETE":
            deleteReq(req, res);
        break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title: "Not Found", message: "Hello fggt, 404!"}));
            res.end();   
    }
});

server.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});
