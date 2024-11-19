const express = require('express');
const router = express.Router();
const Bikes = require('../models/BikesModel'); // Updated model import to Bikes
const validate = require('../config/auth'); // Assuming this is an authentication middleware

// Method : GET || API : /bikes/all
router.get('/all', async (req, res) => {
    try {
        const bikes = await Bikes.find();
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : POST || API : /bikes/add
router.post('/add', async (req, res) => {
    const { title, img, price, brand, rating } = req.body;
    if (!title || !img || !price || !brand || typeof rating !== 'number') {
        return res.status(400).json({ message: "All fields (title, img, price, brand, rating) are required" });
    }
    try {
        const newBike = new Bikes({ title, img, price, brand, rating });
        await newBike.save();
        res.status(201).json(newBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : PUT || API : /bikes/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedBike = await Bikes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        res.status(200).json(updatedBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : DELETE || API : /bikes/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBike = await Bikes.findByIdAndDelete(req.params.id);
        if (!deletedBike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        res.status(200).json({ message: "Bike Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
