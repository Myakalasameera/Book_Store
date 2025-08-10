const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()

const app = express()

const port = process.env.PORT || 7000;

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

//routes
const bookRoutes = require('./src/books/book.route');
app.use('/api/books', bookRoutes);

const orderRoutes = require('./src/orders/order.route');
app.use('/api/orders', orderRoutes);

const userRoutes = require('./src/users/user.route');
app.use('/api/auth', userRoutes);

const adminRoutes = require('./src/stats/admin.stats');
app.use('/api/admin', adminRoutes);

// ✅ Add fallback route after all others
app.get('/', (req, res) => {
  res.send("Welcome to the bookstore server!");
});

// DB connection
async function main() {
  await mongoose.connect(process.env.DB_URI);
}

main()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection failed", err));

// Server start
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});