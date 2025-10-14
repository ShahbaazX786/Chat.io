import jwt from 'jsonwebtoken'
import cloudinary from './cloudinary.js';

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

const uploadImage = async (img) => {
    let imgUrl;
    try {
        const response = await cloudinary.uploader.upload(img);
        if (response && response.secure_url) {
            imgUrl = response.secure_url;
        }
        return imgUrl;
    } catch (error) {
        console.log('Error Uploading Image to Cloudinary', error.message);
    }
}

export { generateToken, decodeToken, uploadImage };