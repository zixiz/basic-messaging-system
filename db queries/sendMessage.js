const {User,Message} = require('../db_connection/sequelize');  

module.exports = async function sendMessage (req, res ,data ) {
    Message.create(data).then((response)=>{
        res.json({response:response});
    }).catch((error)=>{
        console.log({error:error.message});
        res.status(500).send(error.message);
    })

};
