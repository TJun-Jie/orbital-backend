const express = require('express')
const MealController = require('../controllers/Meal')
const router = express.Router();

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, MealController.findAll);
router.get('/getbreakfast', MealController.getRandomMealBreakfast);
router.get('/getlunch', MealController.getRandomMealLunch);
router.get('/getdinner', MealController.getRandomMealDinner);
router.get('/getsnack', MealController.getRandomMealSnack);
router.get('/breakfast', protect,MealController.getAllBreakfast);
router.get('/lunch', protect,MealController.getAllLunch);
router.get('/dinner', protect,MealController.getAllDinner);
router.get('/snacks', protect,MealController.getAllSnacks);
router.get('/:id', protect,MealController.findOne);

router.post('/', protect,MealController.create);
router.patch('/:id', protect,MealController.update);
router.delete('/:id', protect,MealController.destroy);



module.exports = router