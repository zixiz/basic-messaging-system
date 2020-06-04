const {User,Message} = require('../db_connection/sequelize');  

module.exports = function sendMessage (req, res ,data ) {
    Message.create(data).then((response)=>{
        res.json({success:true,response:response});
    }).catch((error)=>{
        console.log({error:error.message});
        res.json({success:false,error:error.message});
    })

};
