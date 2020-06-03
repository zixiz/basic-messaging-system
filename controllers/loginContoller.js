const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../db_connection/sequelize');  
const loginValidation = require('../validation/loginValidation');

module.exports = async function login (req, res) {
    const {error} = loginValidation(req.body);
    if(error) return res.json(error.details[0].message);

    const userData = await User.findOne({
        where:{email:req.body.email}
    });
    if(userData === null) return res.status(400).send("Email or password are wrong");

    const validPassword = await bcrypt.compare(req.body.password,userData.password);
    if(!validPassword) return res.status(400).send("Invalid Password");

    const token = jwt.sign({id:userData.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({token});
};
