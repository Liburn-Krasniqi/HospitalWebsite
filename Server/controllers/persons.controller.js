const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.create = async (req,res) => {
  const body = req.body;
  try{
      const person = await prisma.person.create({
      data: {
        Firstname: body.Firstname,
        Surname: body.Surname,
        Birthday: body.Birthday,
        Sex: body.Sex,
        Phone: body.Phone,
        Email: body.Email,
        City: body.City,
        Street: body.Street,
        AddressNr: body.AddressNr,
        Roli: body.Roli,
        Password: body.Password
      },
    })
    res.send(person);
  
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}

exports.read = async (req, res) => {
  let persons;
 
  try{
    if(req.query.Firstname != null){
      persons = await prisma.person.findMany({
      where: {
        Firstname: {contains: req.query.Firstname},
      },
    });
  }else if(req.query.Surname != null){
    persons = await prisma.person.findMany({
      where: {
        Surname: {contains: req.query.Surname},
      },
    });
  }else{
    persons = await prisma.person.findMany();
  }
  res.send(persons);
}catch(err){
  console.log(err);
}finally{async () => {
  await prisma.$disconnect()
}}
};

exports.update = async (req,res) => {
  const body = req.body;
  try{
    const person = await prisma.person.update({
      where: {
        UserID: Number(req.query.UserID)
      },
      data: {
        Firstname: body.Firstname,
        Surname: body.Surname,
        Birthday: body.Birthday,
        Sex: body.Sex,
        Phone: body.Phone,
        Email: body.Email,
        City: body.City,
        Street: body.Street,
        AddressNr: body.AddressNr,
        Roli: body.Roli,
        Password: body.Password
      }
    })

    res.send(person);
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}

}

exports.delete = async (req,res) => {
  
  try{
    let persons;
    if(req.query.UserID != null){
      persons = await prisma.person.delete({
        where: {UserID: Number(req.query.UserID)}
      });
    }else{
      persons = await prisma.person.deleteMany();
    }

    res.send(persons);
  }
  catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}