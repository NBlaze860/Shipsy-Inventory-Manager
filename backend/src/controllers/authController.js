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


export const loginUser = async (req, res) => {
    try {
        const userData = await authService.login(req.body, res);
        res.status(200).json(userData);
    } catch (error) {
        console.log('Error in login controller', error.message);
        if (error.message === 'Invalid credentials') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logoutUser = (req, res) => {
    try {
        authService.logout(res);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        // Assuming req.user.id is populated by the auth middleware
        const user = await authService.getProfile(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in getUserProfile controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
