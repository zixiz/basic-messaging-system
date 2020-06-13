const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../db_connection/sequelize');  
const {loginValidation} = require('../validation/validations');

module.exports = async function login (req, res) {
    const {error} = loginValidation(req.body);
    if(error) return res.json({success:false,error:error.details[0].message});

    const userData = await User.findOne({
        where:{email:req.body.email}
    });
    if(userData === null) return res.json({success:false,error:"Email or password are wrong"});

    const validPassword = await bcrypt.compare(req.body.password,userData.password);
    if(!validPassword) return res.json({success:false,error:"Invalid Password"});

    const token = jwt.sign({id:userData.id},process.env.TOKEN_SECRET, {expiresIn: 86400});
    res.json({success:true,accessToken:token,isLoggedIn:true});
};
