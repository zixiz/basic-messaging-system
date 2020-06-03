const {User,Message} = require('../db_connection/sequelize');  

module.exports = async function getAllRecivedMessages(req, res){
    Message.findAll({where:{reciver:req.user.id,deleted:0},
            include:[{model:User,attributes:["email","id"]}]
        }).then((response)=>{
            res.json({response:response});
        }).catch((error)=>{
            console.log({error:error.message});
            res.status(500).send(error.message);
        })
}