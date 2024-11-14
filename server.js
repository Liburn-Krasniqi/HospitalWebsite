const express = require("express");
const dotenv = require("dotenv");

const swaggerDocs = require('./swagger.js');

// const swaggerjsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

dotenv.config();

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000" //per siguri demek
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());//me qita e hjekum qafe parserin ig?

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require("./Server/routes/persons.routes.js")(app);

require("./Server/routes/services.routes.js")(app);

require("./Server/routes/patients.routes.js")(app);

require("./Server/routes/rooms.routes.js")(app);

//complete the persons controller model and router then add another route controller and model to smth else
//after that use an ORM just for shits and gigles



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  try{
    swaggerDocs.swaggerDocs(app, PORT);
    console.log(`Server is running on port ${PORT}.`);
  }catch(err){
    console.log(err);
  }
});