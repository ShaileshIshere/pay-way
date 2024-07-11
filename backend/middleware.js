const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "there's a fault in your inputs"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userID = decoded.userID;
        // console.log("Decoded UserID:", req.userID);
        next();
    } catch(err) {
        res.status(403).json({
            message: "there's a fault in your inputs, kindly recheck"
        });
    }
}

module.exports = authMiddleware;