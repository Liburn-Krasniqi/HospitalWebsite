import { requestBodyParser } from "../util/body-parser.js";
import { pool } from "../database.js";

export async function postReq(req,res){
    if(req.url === "/api/persons"){
        try{
            let body = await requestBodyParser(req);//kthen objekt, yay!
            // req.movies.push(body);
            // writeToFile(req.movies);
            await pool.query(
                `INSERT INTO person (Firstname, Surname, Birthday, Sex, Phone, Email, City, Street, AddressNr, Roli, _Password)
                VALUES (?,?,?,?,?,?,?,?,?,?,?);
                `,[
                    body.Firstname,
                    body.Surname,
                    body.Birthday,
                    body.Sex,
                    body.Phone,
                    body.Email,
                    body.City,
                    body.Street,
                    body.AddressNr,
                    body.Roli,
                    body._Password
                ]
            );
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end();
            //console.log("Request Body: ", req);
        }catch(err){
            console.log(err);
            res.writeHead(404, {"Content-Type" : "application/json"});
                res.end(JSON.stringify({
                    title: "Validation Failed",
                    message: "Something is not valid!"
                    }));
        }
    }
}