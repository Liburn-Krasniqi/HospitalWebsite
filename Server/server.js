import http from 'http';
import {getReq} from './methods/get-request.js';
import { postReq } from './methods/post-request.js';
import dotenv from 'dotenv';//automatic restart on save
dotenv.config();

const PORT = process.env.PORT || 5001;//just in case

const server = http.createServer((req,res) => {
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
            res.write(JSON.stringify({title: "Not Found", message: "404!"}));
            res.end();   
    }
});

server.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});
