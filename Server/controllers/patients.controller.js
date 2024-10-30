const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.create = async (req,res) => {
  const body = req.body;
  try{
      const patient = await prisma.patient.create({
        data: {
          person: body.person//qitu duhet me pas kujdes po menoj shkaku i number types? jom tu halucav kapak :(
      },
      select: {
        person: true
      }
    })
    res.send(patient);
  
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}

exports.read = async (req, res) => {
  let patients;
 
try{
  patients = await prisma.patient.findMany({
    include: {
      person: true,
    },
  });
  res.send(patients);
}catch(err){
  console.log(err);
}finally{async () => {
  await prisma.$disconnect()
}}
};

// exports.update = async (req,res) => {
//   const body = req.body;
//   try{
//     const patient = await prisma.patient.update({
//       where: {
//         UserID: Number(req.query.UserID)
//       },
//       data: {
//         bill: body.bill
//       }
//     })

//     res.send(patient);
//   }catch(err){
//     console.log(err);
//   }finally{async () => {
//     await prisma.$disconnect()
//   }}

// }

exports.delete = async (req,res) => {
  
  try{
    let patients;
    if(req.query.UserID != null){
      patients = await prisma.patient.delete({
        where: {UserID: Number(req.query.UserID)}
      });
    }else{
      patients = await prisma.patient.deleteMany();
    }

    res.send(patients);
  }
  catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}