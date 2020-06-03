const {User,Message} = require('../db_connection/sequelize');  

module.exports = async function getallSentMessages (req, res) {
    Message.findAll({where:{sender:req.user.id,deleted:0},
        include:[{model:User, attributes:["email","id"]}]
    }).then((response)=>{
        res.json({response:response});
    }).catch((error)=>{
        console.log({error:error.message});
        res.status(500).send(error.message);
    })

};
