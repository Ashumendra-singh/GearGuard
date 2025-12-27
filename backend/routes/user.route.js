import express from 'express';
import { register, login, logout, getProfile } from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';    
const Userrouter = express.Router();

Userrouter.post('/register', register);
Userrouter.get('/getProfile', authMiddleware, getProfile);
Userrouter.post('/login', login);
Userrouter.post('/logout',authMiddleware, logout);


export default Userrouter;