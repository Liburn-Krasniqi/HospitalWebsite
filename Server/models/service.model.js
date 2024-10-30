const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
//is this direcrory even needed?? pe lo qitu per momentin ig
// constructor
const Service = function(service) {
    this.ServiceName = service.ServiceName;
    this.Price = service.Price;
};

Service.getAll = (ServiceName, result) => {
    let query = "SELECT * FROM service";
  
    if (ServiceName) {
        query += ` WHERE ServiceName LIKE '%${ServiceName}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Services: ", res);
      result(null, res);
    });
  };

module.exports = Service;