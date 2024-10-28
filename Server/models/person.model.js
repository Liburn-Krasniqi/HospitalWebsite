const sql = require("../database.js");

// constructor
const Person = function(person) {
    this.FirstName = person.FirstName;
    this.Surname = person.Surname;
    this.Birthday = person.Birthday;
    this.Sex = person.Sex;
    this.Phone = person.Phone;
    this.Email = person.Email;
    this.City = person.City;
    this.Street = person.Street;
    this.AddressNr = person.AddressNr;
    this.Roli = person.Roli;
    this._Password = person._Password;

};

Person.getAll = (FirstName, result) => {
    let query = "SELECT * FROM person";
  
    if (FirstName) {
        query += ` WHERE FirstName LIKE '%${FirstName}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Persons: ", res);
      result(null, res);
    });
  };

module.exports = Person;