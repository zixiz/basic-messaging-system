const {Message} = require('../db_connection/sequelize');  

module.exports = async function deleteMessageController (req, res) {
  const user = req.user.id;
  let id = parseInt(req.params.id);

  if(id === undefined) res.status(400).send("Must contain id for deleting message");

  const messageData = await Message.findOne({
    where:{id:id}
  });

  if(messageData === null) return res.status(400).send("Can't find this message");

  if(user == messageData.sender || user == messageData.reciver){
    Message.update({deleted:1},{where:{id:id}}).then(response =>{
       return res.json({success:true});
    }).catch((error) => {
      return res.status(500).send(`Database error`);
    });
  }else{
    return res.status(400).send("Cant delete message");
  }

};
