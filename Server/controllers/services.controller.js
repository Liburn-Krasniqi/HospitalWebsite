const Service = require("../models/service.model.js");

exports.findAll = (req, res) => {
    const ServiceName = req.query.ServiceName;
  
    Service.getAll( ServiceName , (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };