const bcrypt = require('bcrypt');
const {User} = require('../db_connection/sequelize');  
const {registerValidation} = require("../validation/validations");
module.exports = async function register (req, res) {

    const {error} = registerValidation(req.body);
    if(error) return res.json(error.details[0].message);

    const emailExist = await User.findOne({
        where:{email:req.body.email}
    });
    if(emailExist !== null) return res.status(400).send("Email already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    try{
        const response = await User.create({email:req.body.email,
          password:hashedPassword,
          full_name:req.body.full_name
        });
        return res.json({response:response});
      }catch (err) {
        return res.status(400).send(err);
      }
};
