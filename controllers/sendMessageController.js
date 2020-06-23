const {sendMessageValidation} = require('../validation/validations');
const sendMessage = require('../db queries/sendMessage')

module.exports = function sendMessageController (req, res) {
    let data = {sender:req.user.id,
        reciver:req.body.sender.reciver,
        message:req.body.sender.message,
        subject:req.body.sender.subject
        }

    
       const {error} = sendMessageValidation(data);
       if(error) return res.json({success:false,error:error.details[0].message});
       

       data.deleted = 0;
       
       sendMessage(req, res ,data);   
};
