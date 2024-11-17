const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();


exports.read = async (req, res) => {
    let departments;
  try{
    departments = await prisma.department.findMany();
    res.send(departments);
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
  };