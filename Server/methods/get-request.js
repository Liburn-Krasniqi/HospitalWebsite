import {pool} from '../database.js';

export async function getReq(req,res){
    //let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = req.url.split("/")[2];
    let query;
    
    try{ 
        switch(req.url){
            case "/persons":
                if(typeof id ==='number'){
                    query =[`SELECT * FROM person WHERE UserId = ?;`, [id]];
                }else{
                    query = [`SELECT * FROM person;`,[null]];//very ugly solution to not deconstruct the string into chars :(
                }
            break;
            case "/patients":
                query = [`SELECT pe.UserId, pe.FirstName, pe.Birthday, pe.Sex, pe.Phone, pe.Email, pe.City, pe.City, pe.Street, pe.AddressNr, pe.Roli
                         FROM patient p ,person pe 
                         where p.UserId = pe.UserId;`,[null]];
            break;
            default:
                res.writeHead(404, {"Content-Type" : "application/json"});
                res.end(JSON.stringify({title: "Not Found", message: "Something wrong with your request sowyy!"}));
            }
        const [result] = await pool.query(...query);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();    
    }catch(err){
        console.log("QIKY OSHT ERRORI:" + err);
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({
            title: "Not Found",
            message: "Something wrong with your request."
        }));
    }
};