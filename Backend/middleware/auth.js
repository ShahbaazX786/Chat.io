import { decodeToken } from "../lib/utils.js";
import User from "../models/User.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decodedToken = decodeToken(token);
        const user = await User.findById(decodedToken.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export default protectedRoute;