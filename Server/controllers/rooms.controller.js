const { PrismaClient } = require('@prisma/client')
const Joi = require('joi');

const prisma = new PrismaClient()

const schema = Joi.object({
  DeptId: [Joi.number().positive(), Joi.allow(null)]//kom mujt edhe mos me pas si object. 
});

exports.create = async (req,res) => {
  const body = req.body;
  try{
      let deptid;
      const value = await schema.validateAsync(body);
      const room = await prisma.room.create({
        data: {
          DeptId: deptid,
      },
    })
    res.statusCode = 201;
    res.send(room);
    res.end();
  }catch(err){
    console.log(err);
    res.writeHead(403, {"Content-Type" : "application/json"});
    res.end(JSON.stringify({title: "Validation error", message: err.details[0].message}));
  }finally{async () => {
    await prisma.$disconnect()
  }}
}

exports.read = async (req, res) => {
  let rooms;
  try{
    rooms = await prisma.room.findMany({
      orderBy: [
        {
          RoomID: 'asc',
        }
      ],
      include: {
        department: {
            select: {
              DeptName: true,
            }
        },
      }
    });
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(rooms);
    res.end();
}catch(err){
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end();
}finally{async () => {
  await prisma.$disconnect()
}}
};

exports.update = async (req,res) => {
  const body = req.body;
  try{
    const value = await schema.validateAsync(body);
    const room = await prisma.room.update({
      where: {
        RoomID: Number(req.query.RoomID)
      },
      data: {
        DeptId: Number(body.DeptId)
      }
    })

    res.send(room);
  }catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}

}

exports.delete = async (req,res) => {
  
  try{
    let rooms;
    console.log(req.query.RoomID)
    if(req.query.RoomID != null){
      rooms = await prisma.room.delete({
        where: {RoomID: Number(req.query.RoomID)}
      });
    }else{
      rooms = await prisma.room.deleteMany();
    }

    res.send(rooms);
  }
  catch(err){
    console.log(err);
  }finally{async () => {
    await prisma.$disconnect()
  }}
}