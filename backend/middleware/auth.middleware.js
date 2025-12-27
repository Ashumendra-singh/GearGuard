import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authtoken = req.cookies.token;
    
        if (!authtoken) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        
        const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
