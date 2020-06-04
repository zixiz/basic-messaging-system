const {User,Message} = require('../db_connection/sequelize');  

module.exports = function getallSentMessages (req, res) {
    Message.findAll({where:{sender:req.user.id,deleted:0},
        include:[{model:User, attributes:["email","id"]}]
    }).then((response)=>{
        res.json({success:true,response:response});
    }).catch((error)=>{
        console.log({error:error.message});
        res.json({success:false,error:error.message});
    })

};
