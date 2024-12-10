const mongoose = require('mongoose');
const user = require('./user');

const nutritionSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId, ref: "Food"
    },
      protein: {
        type: String,
      },
      calories: {
        type: String,
      },
      fats: {
        type: String,
      },
      carbs: {
        type: String,
      }
    });

const foodSchema = new mongoose.Schema(
    {
      foodName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
      },
      currentWeight: {
        type: Number,
        required: true,
      },
      weightGoal: {
        type: Number,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
      },
      nutritions: [nutritionSchema]
  });

    const Food = mongoose.model('Food', foodSchema);


  module.exports = Food;
