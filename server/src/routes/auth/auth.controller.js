const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getUsers } = require('../../models/auth.models')
const srvLookup = require('../../utilities/server.obj.lookup')

async function httpAuthUser(req, res) {
    const user = req.body
    if (!user.username || !user.password) return res.status(400).json({
        message: srvLookup.SERVER_RTN_MSG_USER.missingInputFieldsOnAuth
    })
    const users = await getUsers();
    const locatedUser = users.find(person => person.username === user.username);
    if (!locatedUser) return res.status(401);
    const pwMatch = await bcrypt.compare(user.password, locatedUser.hashed_password)
    if (pwMatch) {
        const accessToken = jwt.sign({
                username: locatedUser.username
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: srvLookup.TOKEN_EXPIRATION.expiresIn30s
            }
        )
        const refreshToken = jwt.sign({
                username: locatedUser.username
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: srvLookup.TOKEN_EXPIRATION.epxiresIn1d
            }
        )
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({
            accessToken,
            "success": `User ${locatedUser.username} logged in succesfully!`
        })
    } else {
        return res.status(401);
    }
}

 function httpHandleRefreshT(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({
        message: srvLookup.ERROR_CODE_MSG[401]
    });
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        async (err, decoded) => {
            if (err) return res.status(403).json({
                message: srvLookup.ERROR_CODE_MSG[403]
            })
            const locatedUser = await getUsers(exstUser => exstUser.username === decoded.username)
            if (!locatedUser) return res.status(401).json({
                message: srvLookup.ERROR_CODE_MSG[401]
            })
            const accessToken = jwt.sign({
                username: locatedUser.username,
            },  process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: srvLookup.TOKEN_EXPIRATION.expiresIn30s
            })
            res.json({
                aT: accessToken
            })
        }
    )
}

module.exports = {
    httpAuthUser,
    httpHandleRefreshT
}