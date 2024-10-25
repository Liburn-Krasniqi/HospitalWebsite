import { requestBodyParser } from "../util/body-parser.js";
import { pool } from "../database.js";

export async function putReq(req,res){
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = Number(req.url.split("/")[3]);
    // const regexV4 = new RegExp(
    //      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    // );
    
    if(req.url === "/api/movies" &&  !(typeof id ==='number')){
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Not a valid ID!"}));
    }else if(baseUrl==="/api/movies" &&  (typeof id ==='number')){
        try{
            let body = await requestBodyParser(req);
            
                //req.movies.splice(index, 1, body); //nashta bon qishtu??

                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }catch(err){
            console.log(err);
            res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(
                JSON.stringify({
                  title: "Validation Failed",
                  message: "Request body is not valid",
                })
              );
            }
    }
};