const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Food = require('../models/food');
const router = express.Router();

// ========== Public Routes ===========
router.post('/', async (req, res) => {
    try {
      req.body.user = req.user._id;
      const food = await Food.create(req.body);
      food._doc.user = req.user;
      res.status(201).json(food);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  

  router.get('/', async (req, res) => {
    try {
      const foods = await Food.find({})
        .populate('user')
        .sort({ createdAt: 'desc' });
      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  
  router.put('/:foodId', async (req, res) => {
    try {
      const food = await Food.findById(req.params.foodId);
        if (!food.user.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
        const updatedFood = await Food.findByIdAndUpdate(
        req.params.foodId,
        req.body,
        { new: true }
      );
        updatedFood._doc.user = req.user;
        res.status(200).json(updatedFood);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  router.get('/:foodId', async (req, res) => {
    try {
      const food = await Food.findById(req.params.foodId).populate('user');
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  router.delete('/:foodId', async (req, res) => {
    try {
      const food = await Food.findById(req.params.foodId);
      if (!food.user.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedFood = await Food.findByIdAndDelete(req.params.foodId);
      res.status(200).json(deletedFood);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  router.post('/:foodId/nutritions', async (req, res) => {
    try {
      req.body.user = req.user._id;
      const food = await Food.findById(req.params.foodId);
      food.nutritions.push(req.body);
      await food.save();
  
      const newNutritions = food.nutritions[food.nutritions.length - 1];
  
      newNutritions._doc.user = req.user;
        res.status(201).json(newNutritions);
    } catch (error) {
      res.status(500).json(error);
    }
  });
// ========= Protected Routes =========

router.use(verifyToken);


module.exports = router;
