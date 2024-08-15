import express from "express";
import { body } from "express-validator";
import { Transaction } from "../models/transactionModel.js";
import { Store } from "../models/storeModel.js";
import { User } from "../models/userModel.js"; // Assuming there is a User model
import { validateRequest } from "../middlewares/validateRequest.js";
import auth from "../middlewares/auth.js"; // Import your auth middleware

const router = express.Router();

// Get all transactions (authentication required)
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("store")
      .populate("user");
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new transaction (authentication required)
router.post(
  "/",
  auth,
  [
    body("store").isMongoId().withMessage("Invalid store ID"),
    body("user").isMongoId().withMessage("Invalid user ID"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("type")
      .isString()
      .withMessage("Type must be a string")
      .isIn(["buy", "sell"])
      .withMessage('Type must be either "buy" or "sell"'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { store, user, amount, type } = req.body;

      const storeExists = await Store.findById(store);
      if (!storeExists) {
        return res.status(404).send({ error: "Store not found" });
      }

      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(404).send({ error: "User not found" });
      }

      const transaction = new Transaction({
        store,
        user,
        amount: Number(amount),
        type,
      });

      // Update the store amount based on the transaction type
      if (type === "buy") {
        storeExists.amount += Number(amount);
      } else if (type === "sell") {
        if (storeExists.amount < Number(amount)) {
          return res
            .status(400)
            .send({ error: "Insufficient stock in the store" });
        }
        storeExists.amount -= Number(amount);
      }

      await storeExists.save();
      await transaction.save();
      res.send(transaction);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Update a transaction (authentication required)
router.patch(
  "/:id",
  auth,
  [
    body("store").optional().isMongoId().withMessage("Invalid store ID"),
    body("user").optional().isMongoId().withMessage("Invalid user ID"),
    body("amount")
      .optional()
      .isNumeric()
      .withMessage("Amount must be a number"),
    body("type")
      .optional()
      .isString()
      .withMessage("Type must be a string")
      .isIn(["buy", "sell"])
      .withMessage('Type must be either "buy" or "sell"'),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).send({ error: "Transaction not found" });
      }

      if (req.body.store) {
        const storeExists = await Store.findById(req.body.store);
        if (!storeExists) {
          return res.status(404).send({ error: "Store not found" });
        }
      }

      if (req.body.user) {
        const userExists = await User.findById(req.body.user);
        if (!userExists) {
          return res.status(404).send({ error: "User not found" });
        }
      }

      // Ensure amount is converted to a number if it's being updated
      if (req.body.amount) {
        req.body.amount = Number(req.body.amount);
      }

      lodash.assign(transaction, req.body);
      await transaction.save();
      res.send(transaction);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Delete a transaction (authentication required)
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found" });
    }
    res.send(transaction);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
