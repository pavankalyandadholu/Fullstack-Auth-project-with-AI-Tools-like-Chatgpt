import express from 'express';
const router = express.Router();
import UserController from './user.Controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const userController = new UserController();
// Placeholder route for testing
// Just for checking
router.get('/', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});
router.post('/login',userController.login);
router.post('/signup',userController.singUp);
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

export {router}
