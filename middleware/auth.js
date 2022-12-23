//middleware permettant d'extraire les info du token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //recuperation du token 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.CLE_PRIVE);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};