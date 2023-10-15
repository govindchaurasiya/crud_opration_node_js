const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser=require('body-parser');
dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

// Import routes
const productRoutes = require("./routes/product");
const authRoutes = require('./routes/auth');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// route Middlewares
app.use('/auth', authRoutes);
app.use("/api/products", productRoutes);

app.listen(4000, () => console.log("server up and runing on port 4000!"));
