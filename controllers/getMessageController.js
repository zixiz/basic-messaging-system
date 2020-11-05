const {Message,User} = require('../db_connection/sequelize');  

module.exports = async function getMessageController (req, res) {
  const user = req.user.id;
  let id = parseInt(req.params.id);


  if(id === undefined || !Number.isInteger(id)) res.json({success:false,error:"Must contain id of message"});

  const messageData = await Message.findOne({
    where:{id:id,deleted:false}
  });

  if(messageData === null) return res.json({success:false,error:"Can't find this message"});

  if(user == messageData.sender || user == messageData.reciver){
    if(messageData.sender === user){
      const messageUserData = await User.findOne({where:{"id":messageData.reciver},attributes:['email','id']});

      return res.json({success:true,message:messageData,messageUserData:messageUserData})
    }else{
      const messageUserData = await User.findOne({where:{"id":messageData.sender},attributes:['email','id']});
      return res.json({success:true,message:messageData,messageUserData:messageUserData})
    }
  }else{
    return res.json({success:false,error:"Cant Read this message"});
  }

};
