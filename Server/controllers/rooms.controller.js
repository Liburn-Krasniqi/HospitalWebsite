const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.create = async (req,res) => {
  const body = req.body;
  try{
      const room = await prisma.room.create({
        data: {
          DeptId: Number(body.DeptId),
      },
    })
    res.send(room);
  
  }catch(err){
    console.log(err);
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
      ]
    });
    
    res.send(rooms);
}catch(err){
  console.log(err);
}finally{async () => {
  await prisma.$disconnect()
}}
};

exports.update = async (req,res) => {
  const body = req.body;
  try{
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