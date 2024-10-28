const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//const cors = require("cors");

const app = express();

//var corsOptions = {
//   origin: "http://localhost:8081"
//  };

//app.use(cors(corsOptions));

app.use(express.json());//me qita e hjekum qafe parserin ig?

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require("./Server/routes/persons.routes.js")(app);

require("./Server/routes/services.routes.js")(app);

//complete the persons controller model and router then add another route controller and model to smth else
//after that use an ORM just for shits and gigles
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});