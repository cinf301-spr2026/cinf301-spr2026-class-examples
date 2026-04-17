const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).json({ error: "please provide a token" })
    }

    const [scheme, credentials] = token.split(" ")
    if (scheme !== 'Bearer' || !credentials) {
        return res.status(403).json({ error: 'please provide a valid Bearer token' })
    }

    jwt.verify(credentials, tokenSecret, (err, value) => {
        if (err) {
            return res.status(401).json({ error: 'failed to authenticate token' })
        }

        req.user = value.data
        next()
    })
}
