import { requestBodyParser } from "../util/body-parser.js";
import { pool } from "../database.js";

export async function putReq(req,res){
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = Number(req.url.split("/")[3]);
    
    if(baseUrl === "/api/persons" &&  !(typeof id ==='number')){
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Not a valid ID!"}));
    }else if(baseUrl==="/api/persons" &&  (typeof id ==='number')){
        try{
            let body = await requestBodyParser(req);
            
                await pool.query(`
                    UPDATE person
                    SET Firstname = ?, Surname = ?, Birthday = ?, Sex = ?, Phone = ?, Email = ?, City = ?, Street = ?, AddressNr = ?, Roli = ?, _Password = ?
                    WHERE UserId = ?;
                    `, [body.Firstname,
                        body.Surname,
                        body.Birthday,
                        body.Sex,
                        body.Phone,
                        body.Email,
                        body.City,
                        body.Street,
                        body.AddressNr,
                        body.Roli,
                        body._Password,
                        id]);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(
                    JSON.stringify({
                    title: "Succesfull Put Request",
                    message: "Entity Updated",
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
    }
};