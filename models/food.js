const mongoose = require('mongoose')

const nutritionSchema = new mongoose.Schema(
    {
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
      nutritions: [nutritionSchema]
  });

    const Food = mongoose.model('Food', foodSchema);


  module.exports = Food;
