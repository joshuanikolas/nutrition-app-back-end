const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const foodsRouter = require('./controllers/foods');
const testJWTRouter = require('./middleware/verify-token')
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use('/users', usersRouter);
app.use('/foods', foodsRouter);
app.use('/jwt-test', testJWTRouter)
app.use(cors())

app.listen(3000, () => {
  console.log('The express app is ready!');
});
