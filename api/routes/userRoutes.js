import express from "express";
import { body } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import lodash from "lodash";
import { User } from "../models/userModel.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import auth from "../middlewares/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

// Create a new user
router.post(
  "/",
  [
    body("username")
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be between 3 and 50 characters long"),
    body("phone")
      .isString()
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage("Invalid phone number"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { username, phone, password } = req.body;

      const userExists = await User.findOne({ phone });
      if (userExists) {
        return res
          .status(400)
          .send({ error: "Phone number is already in use" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ username, phone, password: hashedPassword });
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send({ error: "Server error" });
    }
  }
);

// Update a user
router.patch(
  "/:id",
  [
    body("username")
      .optional()
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be between 3 and 50 characters long"),
    body("phone")
      .optional()
      .isString()
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage("Invalid phone number"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      if (req.body.phone) {
        const userExists = await User.findOne({ phone: req.body.phone });
        if (userExists && userExists._id.toString() !== req.params.id) {
          return res
            .status(400)
            .send({ error: "Phone number is already in use" });
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
      res.status(500).send({ error: "Server error" });
    }
  }
);

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).send({ error: "Invalid phone number" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

export default router;
