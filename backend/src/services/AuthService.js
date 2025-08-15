import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    /* ----------  Helpers ---------- */

    generateToken(userId, res) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        return token;
    }

    validateSignupData({ username, email, password, role }) {
        if (!username || !email || !password) {
            throw new Error('Username, email and password are required');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        if (role && !['admin', 'user'].includes(role)) {
            throw new Error('Role must be either "admin" or "user"');
        }
    }

    async checkExistingUser(username, email) {
        const existing = await this.User.findOne({
            $or: [{ username }, { email }],
        });

        if (existing) {
            if (existing.username === username) {
                throw new Error('Username is already taken');
            }
            if (existing.email === email) {
                throw new Error('Email already registered');
            }
        }
    }

    /* ----------  Public API ---------- */

    async signup(userData, res) {
        const { username, email, password, role } = userData;

        /* 1. Validate basic input */
        this.validateSignupData({ username, email, password, role });

        /* 2. Check for duplicates */
        await this.checkExistingUser(username, email);

        /* 3. Hash password */
        const hashedPassword = await bcrypt.hash(password, 10);

        /* 4. Create new user */
        const newUser = new this.User({
            username,
            email,
            password: hashedPassword,
            role,               // will default to 'user' if undefined
        });

        /* 5. Persist & issue JWT */
        await newUser.save();
        this.generateToken(newUser._id, res);

        /* 6. Return safe payload */
        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        };
    }

    async login(userData, res) {
        const { email, password } = userData;

        /* 1. Find user by email */
        const user = await this.User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        /* 2. Compare passwords */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        /* 3. Generate token and return user data */
        this.generateToken(user._id, res);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    logout(res) {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
    }

    async getProfile(userId) {
        const user = await this.User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

export default AuthService;
