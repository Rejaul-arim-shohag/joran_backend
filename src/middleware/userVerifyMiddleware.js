var jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    let token = req.headers["token"];
    jwt.verify(token,"SecretKey123456789",(err, decoded)=>{
        if(err){
            res.status(401).json({status:"unauthorized"})
        } else{
            let email=decoded['data'];
            req.headers.email=email
            next();
        }
    })
}
