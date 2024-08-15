import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import storeRoute from "./routes/storeRoute.js"; // Adjust the path as necessary
import userRoute from "./routes/userRoutes.js"; // Adjust the path as necessary
import transactionRoute from "./routes/transactionRoutes.js"; // Adjust the path as necessary
// Initialize Express
const app = express();

// Connect to Database
connectDB();
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).send("Something broke!"); // Generic error message
});

// Catch-all route middleware for undefined routes

// Note: Ensure these middlewares are added after all other app.use() and route calls
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/stores", storeRoute);
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
// Start Server
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
