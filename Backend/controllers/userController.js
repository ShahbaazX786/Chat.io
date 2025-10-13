import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from "../models/User";

// takes data and stores in db by returning a token.
const signup = async () => {
    const { fullName, email, password, bio } = req.body;
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: 'All Fields are Required' })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: 'Account Already Exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ fullName, email, password: hashedPassword, bio });
        const token = generateToken(newUser._id);
        res.json({ success: true, message: 'Account Created Sucessfully' }, token)

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// checks data and returns jwt token if matches.
const login = async () => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ success: false, message: 'All Fields are Required' })
        }

        const user = await User.findOne({ email });
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if (!user || !isPasswordMatching) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }
        const token = generateToken(user._id);
        res.json({ success: true, user, token, message: 'Login Sucessful' });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Checks if user is authenticated.
const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
}

// updates existing data in db
const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilePic) {
            await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true })
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
        }
        res.json({ success: true, user: updatedUser });


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export { checkAuth, login, signup, updateProfile };
