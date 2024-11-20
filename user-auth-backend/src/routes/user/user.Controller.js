import User from "./user.Model.js";

import jwt from 'jsonwebtoken';

export default class UserController{
   async singUp(req,res){
    try {
        const { email, password } = req.body;

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully', user: { email: user.email } });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
    }

    async login(req,res){
        try {
            const { email, password } = req.body;
    
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Compare the provided password with the stored hash
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email }, // Payload
                process.env.JWT_SECRET, // Secret key
                { expiresIn: '1h' } // Token expiration
            );
    
            res.status(200).json({
                message: 'Login successful',
                token,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}



