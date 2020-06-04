const getAllRecivedMessages = require('../db queries/getAllRecivedMessages');
const getallSentMessages = require('../db queries/getallSentMessages');

module.exports = function getMessagesController (req, res) {
    let filter = req.query.filter;
    if (filter === undefined){
        filter = "receive";
    }

    switch(filter) {
        case "receive":
            getAllRecivedMessages(req, res);
            break;
        case "sent":
            getallSentMessages(req, res);
          break;
        default:
            getAllRecivedMessages(req, res);
      }
    

};

