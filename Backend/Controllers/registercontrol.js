import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import user from '../models/User.js';

dotenv.config();
// function for register user

const registercontroller = asyncHandler(async (req, res) => {
    try {
// get user details from request
        const { name, email, mobile, password } = req.body;
        console.log('Request received:', { name, email, mobile }); // Log request data

    
        const userExist = await user.findOne({ email });
// check if user already exist or not
        if (!userExist) {
            // encrypt the password using bcrypt
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
            //create a user in user collection 
        const user1 = await user.create({ name, email, mobile, password: hashedpassword });

            res.status(200).json({ user: user1 });
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(422).json(err);
    }
});

export { registercontroller };
