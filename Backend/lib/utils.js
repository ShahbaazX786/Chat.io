import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId }, secretKey);
    return token;
}

const decodeToken = (token) => {
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey)
    return decodedToken;
}

export { generateToken, decodeToken };