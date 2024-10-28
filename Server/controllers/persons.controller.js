const Person = require("../models/person.model.js");

exports.findAll = (req, res) => {
    const FirstName = req.query.FirstName;
  
    Person.getAll( FirstName , (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };