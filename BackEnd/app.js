//app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors=require('cors');
const errorMiddleware = require('./middleware/catchAsyncError')
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const products = require('./routes/product')
const auth = require('./routes/auth')
app.use('/api/v1/',products)
app.use('/api/v1/',auth)

app.use(errorMiddleware)
module.exports = app;