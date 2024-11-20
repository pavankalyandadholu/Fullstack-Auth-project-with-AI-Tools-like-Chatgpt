import express from 'express';
const userRouter = express.Router();
import UserController from './user.Controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const userController = new UserController();
// Placeholder route for testing
// tesing to push to other branch
userRouter.get('/', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});
userRouter.post('/login',userController.login);
userRouter.post('/signup',userController.singUp);
userRouter.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

export default userRouter
