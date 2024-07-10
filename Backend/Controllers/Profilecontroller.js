import mongoose from "mongoose";
import User from '../models/User.js';

// used to send the all details of user except password

const Profilecontroller = async (req, res) => {
    try {
        const { id } = req.params; // Correctly extract id from req.params
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

export { Profilecontroller };
