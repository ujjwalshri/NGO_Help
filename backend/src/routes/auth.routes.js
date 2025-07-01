import express from 'express';
import { signup, login, logout, protect } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/verify', protect, (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Token is valid',
        user: req.admin 
    });
});

export default router;