const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.create = async (req,res) => {
  const body = req.body;
  try{
      const service = await prisma.service.create({
        data: {
        ServiceName: body.ServiceName,
        Price: body.Price,
      },
    })
    res.send(service);
  
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}

exports.read = async (req, res) => {
  let services;
 
  try{
    if(req.query.ServiceName != null){
      services = await prisma.service.findMany({
      where: {
        ServiceName: {contains: req.query.ServiceName},
      },
    });
  }else if(req.query.Price != null){
    services = await prisma.service.findMany({
      where: {
        Price: {lte: req.query.Price},
      },
    });
  }else{
    services = await prisma.service.findMany();
  }
  res.send(services);
}catch(err){
  console.log(err);
}finally{async () => {
  await prisma.$disconnect()
}}
};

exports.update = async (req,res) => {
  const body = req.body;
  try{
    const service = await prisma.service.update({
      where: {
        ServiceID: Number(req.query.ServiceID)
      },
      data: {
        ServiceName: body.ServiceName,
        Price: body.Price
      }
    })

    res.send(service);
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}

}

exports.delete = async (req,res) => {
  
  try{
    let services;
    if(req.query.ServiceID != null){
      services = await prisma.service.delete({
        where: {ServiceID: Number(req.query.ServiceID)}
      });
    }else{
      services = await prisma.service.deleteMany();
    }

    res.send(services);
  }
  catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}