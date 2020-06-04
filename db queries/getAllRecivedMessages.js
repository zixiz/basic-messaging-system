const {User,Message} = require('../db_connection/sequelize');  

module.exports = function getAllRecivedMessages(req, res){
    Message.findAll({where:{reciver:req.user.id,deleted:0},
            include:[{model:User,attributes:["email","id"]}]
        }).then((response)=>{
            res.json({success:true,response:response});
        }).catch((error)=>{
            console.log({error:error.message});
            res.json({success:false,error:error.message});
        })
}