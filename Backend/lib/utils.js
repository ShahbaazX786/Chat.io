import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId }, secretKey);
    return token;
}

export { generateToken };