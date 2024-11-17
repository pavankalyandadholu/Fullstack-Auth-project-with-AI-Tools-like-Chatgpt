import express from 'express';
const router = express.Router();
import UserController from './user.Controller.js';

const userController = new UserController();
// Placeholder route for testing
router.get('/', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});
router.post('/login',userController.login);
router.post('/signup',userController.singUp);

export {router}
