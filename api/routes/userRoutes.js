import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

const router = express.Router();

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new user
router.post(
    '/',
    [
        body('username')
            .isString()
            .isLength({ min: 3, max: 50 })
            .withMessage('Username must be between 3 and 50 characters long'),
        body('email')
            .isEmail()
            .withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).send({ error: 'Email is already in use' });
            }

            const user = new User({ username, email, password });
            await user.save();
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

// Update a user
router.patch(
    '/:id',
    [
        body('username')
            .optional()
            .isString()
            .isLength({ min: 3, max: 50 })
            .withMessage('Username must be between 3 and 50 characters long'),
        body('email')
            .optional()
            .isEmail()
            .withMessage('Invalid email address'),
        body('password')
            .optional()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            if (req.body.email) {
                const userExists = await User.findOne({ email: req.body.email });
                if (userExists && userExists._id.toString() !== req.params.id) {
                    return res.status(400).send({ error: 'Email is already in use' });
                }
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            lodash.assign(user, req.body);
            await user.save();
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
