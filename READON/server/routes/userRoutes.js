

// import express from 'express';

// import * as controller from '../controllers/userController.js'; // Importing all functions from userController.js
// // Ensure the path is correct based on your project structure
// import authUser from '../middleware/authUsers.js';


// const { register, login, isAuth, logout } = controller; // Destructuring the imported functions for easier access



// console.log('✅ userRoutes file loaded'); // This should show in your terminal

// const userRoutes = express.Router();

// userRoutes.post('/register', register);
// userRoutes.post('/login', login);
// userRoutes.get('/is-auth',authUser, isAuth);
// userRoutes.get('/logout',authUser, logout);

// userRoutes.get('/test', (req, res) => res.send('🎉 User route is working!'));



// export default userRoutes;

const express = require('express');
const {
  register,
  login,
  isAuth,
  logout
} = require('../controllers/userController.js');
const authUser = require('../middleware/authUsers.js');

console.log('✅ userRoutes file loaded');

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/is-auth', authUser, isAuth);
userRoutes.get('/logout', authUser, logout);

userRoutes.get('/test', (req, res) => res.send('🎉 User route is working!'));

module.exports = userRoutes;

