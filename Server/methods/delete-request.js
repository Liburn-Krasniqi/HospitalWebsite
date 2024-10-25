import { pool } from "../database.js";

export async function deleteReq(req,res){
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = Number(req.url.split("/")[3]);
    
    if(!typeof id ==='number'){
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(
            JSON.stringify({
            title: "Validation Failed",
            message: "ID is not valid!"
            })
        );
    }else if(baseUrl==="/api/persons" &&  (typeof id ==='number')){
        try{
            await pool.query(`
                DELETE FROM person
                WHERE UserId = ?;
                `,[id]);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(
                JSON.stringify({
                title: "Succesfull Delete Request",
                message: "Entity Removed",
                }));
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
    }else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};