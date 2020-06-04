const {User} = require('../db_connection/sequelize');
const { Op } = require("sequelize");

module.exports = function getAllUsersForSendMessage (req, res) {
    let user = req.user.id;
    User.findAll({
        where: {
          id: {
            [Op.not]: user
          }
        },
        attributes:["id","email","full_name"]
      }).then(response =>{
          res.json({success:true,response});
      });
}

