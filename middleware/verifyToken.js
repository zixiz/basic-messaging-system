const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    const token = req.headers["x-access-token"];
    if(!token) return res.json({success:false,error:"Access Denied, Login First",isLoggedIn:false});
    
    try{
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    }catch (err) {
        res.json({success:false,error:'Invalid Token',isLoggedIn:false});
    }
}