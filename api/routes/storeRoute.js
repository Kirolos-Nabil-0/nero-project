import express from 'express';
import { body, validationResult } from 'express-validator';
import lodash from 'lodash';
import { Store } from '../models/storeModel.js';

const router = express.Router();

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();
        res.send(stores);
    } catch (err) {
        res.status(500).send(err);
    }
});
// Get a store by ID 
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findOne({ _id: req.params.id });
        if (!store) {
            return res.status(404).send({ error: 'Store not found' });
        }
        res.send(store);
    } catch (err) {
        res.status(500).send(err);
    }
});



// Create a new store

router.post(
    '/',
    [
        body('name')
            .isString()
            .isLength({ min: 3, max: 100 })
            .withMessage('Store name must be between 3 and 100 characters long'),
        body('amount')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Amount must be a non-negative integer'),
        body('buyPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Buy price must be a non-negative number'),
        body('sellPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Sell price must be a non-negative number'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const store = new Store(req.body);
            await store.save();
            res.send(store);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);
// Update a store


router.patch(
    '/:id',
    [
        body('name')
            .optional()
            .isString()
            .isLength({ min: 3, max: 100 })
            .withMessage('Store name must be between 3 and 100 characters long'),
        body('amount')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Amount must be a non-negative integer'),
        body('buyPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Buy price must be a non-negative number'),
        body('sellPrice')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Sell price must be a non-negative number'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const store = await Store.findOne({ _id: req.params.id });
            if (!store) {
                return res.status(404).send({ error: 'Store not found' });
            }
            lodash.assign(store, req.body);
            await store.save();
            res.send(store);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);
// Specific route to update only the amount of a store
router.patch(
    '/:id/amount',
    [
        body('amount')
            .isInt({ min: 0 })
            .withMessage('Amount must be a non-negative integer'),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const store = await Store.findOne({ _id: req.params.id });
            if (!store) {
                return res.status(404).send({ error: 'Store not found' });
            }
            store.amount = req.body.amount;
            await store.save();
            res.send(store);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

// Delete a store
router.delete('/:id', async (req, res) => {
    try {
        const store = await Store.findOneAndDelete({ _id: req.params.id });
        if (!store) {
            return res.status(404).send({ error: 'Store not found' });
        }
        res.send(store);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
