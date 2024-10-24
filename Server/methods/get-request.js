import {pool} from '../database.js';

export async function getReq(req,res){
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
         /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    
    if(req.url === "/api/persons"){
        const [result] = await pool.query("Select * from person;");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
    }else{
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Something wrong with your request sowyy!"}));
    }
};