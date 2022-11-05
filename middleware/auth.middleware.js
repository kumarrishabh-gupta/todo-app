const jwt = require('jsonwebtoken');

/**
 * @description {JWT based authentication for user}
 * @param  {JSON Object} Request
 * @returns {JSON Object}
 *
 */
module.exports.authentication = function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("authHeader : ", authHeader)
    if(!authHeader){
        res.status(400).send({
            err : "Header Payload error!!!"
        })
    }
    const token = authHeader && authHeader.split(' ')[1] 
    if(token === null) res.status(401).send({
        err : 'unauthorized Access 401'
    });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            res.status(403).send({
                err : 'Unautherised Access 403'
            })
        }
        console.log("user : ", user)
        req.userName = user;
        next();
    })
}