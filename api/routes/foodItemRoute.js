const express = require('express');
const router = express.Router();
const Fooditem = require('../models/FoodItem');
const {body, validationResult} = require('express-validator');

router.post('/itemadd', async (req, res)=>{
    try{
        const {itemName, itemImage, itemPrice, availability} = req.body;
        const newItem = new Fooditem({itemName, itemImage, itemPrice, availability});
        await newItem.save();
        return res.status(200).json({message: 'Item added successfully!'});
    }
    catch (error){
        return res.status(500).json({error: 'Internal server error!'})
    }
});

module.exports = router;