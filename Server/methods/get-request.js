import {pool} from '../database.js';

export async function getReq(req,res){
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = Number(req.url.split("/")[3]);
    // const regexV4 = new RegExp(
    //      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    // );
    try{ 
        if(req.url === "/api/persons"){
            const [result] = await pool.query("SELECT * FROM person;");
            res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
    }else if(baseUrl === "/api/persons" && (typeof id =='number')){
        const [[result]] = await pool.query(`
            SELECT *
            FROM person
            WHERE UserId = ?;`,[id]);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
    }else{
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Something wrong with your request sowyy!"}));
    }
    }catch(err){
        console.log("QIKY OSHT ERRORI:" + err);
        res.writeHead(404, {"Content-Type" : "application/json"});
            res.end(JSON.stringify({
                title: "Not Found",
                message: "Something wrong with your request."
                }));
    }
};