const jwt = require('jsonwebtoken')
const srvLookup = require('../utilities/server.obj.lookup')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({message : srvLookup.ERROR_CODE_MSG[401]})
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedInfo) => {
        if (err) return res.status(403).json({message: srvLookup.ERROR_CODE_MSG[403]});
        req.user = decodedInfo.username;
        next();
    })
}
module.exports = verifyJWT;