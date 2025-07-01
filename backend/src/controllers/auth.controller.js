import Admin from '../models/Admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Cookie configuration
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '7d'
    });
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if admin exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Generate token
        const token = generateToken(admin._id);

        // Set cookie
        res.cookie('jwt', token, cookieOptions);

        // Remove password from response
        admin.password = undefined;

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: {
                admin,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check if admin exists & password is correct
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(admin._id);

        // Set cookie with token
        res.cookie('jwt', token, cookieOptions);

        // Remove password from response
        admin.password = undefined;

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                admin,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', 'loggedout', {
            ...cookieOptions,
            maxAge: 1000 // 1 second
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const protect = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies?.jwt;

        if (!token || token === 'loggedout') {
            return res.status(401).json({
                success: false,
                message: 'Please log in to access this resource'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            
            // Check if admin still exists
            const currentAdmin = await Admin.findById(decoded.id);
            
            if (!currentAdmin) {
                return res.status(401).json({
                    success: false,
                    message: 'The user belonging to this token no longer exists'
                });
            }

            // Grant access to protected route
            req.admin = currentAdmin;
            next();
        } catch (jwtError) {
            console.error('JWT Verification failed:', jwtError);
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.'
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during authentication'
        });
    }
};