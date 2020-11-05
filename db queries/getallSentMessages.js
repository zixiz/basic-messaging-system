const {sequelize} = require('../db_connection/sequelize');  

module.exports = async function getallSentMessages (req, res) {

    try{
        const [results, metadata] = await sequelize.query(`SELECT M.id,M.sender,M.reciver,M.message,M.subject, M.createdAt,M.deleted ,U.id as senderId,U.email as senderEmail from messages as M
        join users as U on M.reciver=U.id where M.sender=${req.user.id} and M.deleted=0 ORDER BY M.createdAt DESC`);
        res.json({success:true,response:results});
    }catch(error){
        console.log({error:error.message});
        res.json({success:false,error:error.message});
    }

};