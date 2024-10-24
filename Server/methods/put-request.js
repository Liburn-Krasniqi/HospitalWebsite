const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req,res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/"))
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
         /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    
    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(!regexV4.test(id)){
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(
            JSON.stringify({
            title: "Validation Failed",
            message: "UUID is not valid!"
            })
        );
    }else if(baseUrl==="/api/movies" && regexV4.test(id)){
        try{
            let body = await requestBodyParser(req);

            const index = req.movies.findIndex((movie) => {
                return movie.id === id;
            });
            if(index === -1){
                res.statusCode = 404;
                res.write(
                    JSON.stringify({ title: "Not Found", message: "Movie not found"})
                );
                res.end();
            }else{
                //req.movies.splice(index, 1, body); //nashta bon qishtu??
                req.movies[index] = {id, ...body};
                writeToFile(req.movies);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }
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
    }else{
        res.writeHead(404, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Something wrong with your request sowyy!"}));
    }
};