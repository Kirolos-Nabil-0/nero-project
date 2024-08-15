import express from "express";
import { body } from "express-validator";
import lodash from "lodash";
import { Store } from "../models/storeModel.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import auth from "../middlewares/auth.js"; // Import your auth middleware

const router = express.Router();

// Get all stores (authentication required)
router.get("/", auth, async (req, res) => {
  try {
    const stores = await Store.find();
    res.send(stores);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a store by ID (authentication required)
router.get("/:id", auth, async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });
    if (!store) {
      return res.status(404).send({ error: "Store not found" });
    }
    res.send(store);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new store (authentication required)
router.post(
  "/",
  auth,
  [
    body("name")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Store name must be between 3 and 100 characters long"),
    body("amount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Amount must be a non-negative integer"),
    body("buyPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Buy price must be a non-negative number"),
    body("sellPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Sell price must be a non-negative number"),
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

// Update a store (authentication required)
router.patch(
  "/:id",
  auth,
  [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Store name must be between 3 and 100 characters long"),
    body("amount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Amount must be a non-negative integer"),
    body("buyPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Buy price must be a non-negative number"),
    body("sellPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Sell price must be a non-negative number"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id });
      if (!store) {
        return res.status(404).send({ error: "Store not found" });
      }
      lodash.assign(store, req.body);
      await store.save();
      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Specific route to update only the amount of a store (authentication required)
router.patch(
  "/:id/amount",
  auth,
  [
    body("amount")
      .isInt({ min: 0 })
      .withMessage("Amount must be a non-negative integer"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const store = await Store.findOne({ _id: req.params.id });
      if (!store) {
        return res.status(404).send({ error: "Store not found" });
      }
      store.amount = req.body.amount;
      await store.save();
      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Delete a store (authentication required)
router.delete("/:id", auth, async (req, res) => {
  try {
    const store = await Store.findOneAndDelete({ _id: req.params.id });
    if (!store) {
      return res.status(404).send({ error: "Store not found" });
    }
    res.send(store);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
