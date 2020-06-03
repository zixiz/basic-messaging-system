const {User,Message} = require('../db_connection/sequelize');  
const getAllRecivedMessages = require('../db queries/getAllRecivedMessages');
const getallSentMessages = require('../db queries/getallSentMessages');

module.exports = async function getMessagesController (req, res) {
    let filter = req.query.filter;
    if (filter === undefined){
        getAllRecivedMessages(req, res);
    }else{
        
        switch(filter) {
            case "sent":
                getallSentMessages(req, res)
              break;
            default:
                getAllRecivedMessages(req, res);
          }
    } 
    

};
