const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const User = require("./src/users/user.model"); 
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

const app = express();
const port = process.env.PORT || 5000;


if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(" ERROR: Razorpay API keys are missing in .env file");
  process.exit(1); // Stop the server if Razorpay keys are missing
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  credentials: true, // Allow cookies & headers
}));
app.use(express.json());

// Register API Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);


// Razorpay - Create Order
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log(" Razorpay Order Created:", order);
    res.json(order);
  } catch (error) {
    console.error(" Razorpay Order Creation Failed:", error);
    res.status(500).json({ error: "Razorpay order creation failed", details: error.message });
  }
});

//  Razorpay - Verify Payment
app.post("/api/payment/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log(" Payment Verified:", razorpay_payment_id);
      return res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      console.warn("⚠ Payment Verification Failed");
      return res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error(" Payment Verification Error:", error);
    res.status(500).json({ error: "Payment verification failed", details: error.message });
  }
});

//  Test Route
app.get("/", (req, res) => {
  res.send("📚 Book Store Server is Running!");
});

//  MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" MongoDB Connected Successfully!");

    // Ensure an admin user exists
    const existingAdmin = await User.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("adminPassword", 10);
      const adminUser = new User({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log(" Admin user created successfully!");
    } else {
      console.log(" Admin user already exists.");
    }
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
}

connectDB();

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});