import User from "./user.Model.js";



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
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            res.status(200).json({ message: 'Login successful', user: { email: user.email } });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}



