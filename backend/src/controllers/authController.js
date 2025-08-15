import AuthService from '../services/AuthService.js';
import User from '../models/UserModel.js';

const authService = new AuthService(User);

export const registerUser = async (req, res) => {
    try {
        const userData = await authService.signup(req.body, res);
        
        res.status(201).json(userData);
        
    } catch (error) {
        console.log('Error in signup controller', error.message);
        
        if (error.message === 'All fields are required' || 
            error.message === 'Password must be at least 6 characters long' ||
            error.message === 'Email already registered' ||
            error.message === 'Username is already taken' ||
            error.message === 'Invalid email format'
          ) {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const loginUser = (req, res) => {
  // Login a user
};

export const getUserProfile = (req, res) => {
  // Get user profile
};