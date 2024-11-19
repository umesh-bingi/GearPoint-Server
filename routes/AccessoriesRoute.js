const express = require('express');
const router = express.Router();
const Accessories = require('../models/AccessoriesModel');
const validate = require('../config/auth');

// Method : GET || API : /accessories/all
router.get('/all', async (req, res) => {
    try {
        const accessories = await Accessories.find();
        res.status(200).json(accessories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : POST || API : /accessories/add
router.post('/add', async (req, res) => {
    const { name, img, price, category, brand, stock, rating } = req.body;
    if (!name || !img || !price || !category || !brand || typeof stock !== 'number' || typeof rating !== 'number') {
        return res.status(400).json({ message: "All fields (name, img, price, category, brand, stock, rating) are required" });
    }
    try {
        const newAccessory = new Accessories({ name, img, price, category, brand, stock, rating });
        await newAccessory.save();
        res.status(201).json(newAccessory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : PUT || API : /accessories/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedAccessory = await Accessories.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }
        res.status(200).json(updatedAccessory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : DELETE || API : /accessories/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedAccessory = await Accessories.findByIdAndDelete(req.params.id);
        if (!deletedAccessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }
        res.status(200).json({ message: "Accessory Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
