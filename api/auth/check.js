const jwt = require('jsonwebtoken');


module.export = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        req.authData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: 'User could not be authorized'
        })
    }
    
}