const jwt = require("jsonwebtoken");
const {User} = require('../db_connection/sequelize');

module.exports = async function checkAuthController (req, res) {
    const token = req.headers["x-access-token"];
    if(!token) return res.json({success:false,error:"Access Denied, Login First",isLoggedIn:false});

    try{
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        const userData = await User.findOne({
            where:{id:req.user.id}
        });

        return res.json({success:true,isLoggedIn:true,id:userData.id,email:userData.email,full_name:userData.full_name});
    }catch (err) {
        return res.json({success:false,error:'Invalid Token',isLoggedIn:false});
    }

};