const express = require('express');
const router = express.Router();
const Queries = require('../models/QueriesModel');

// Get all queries
router.get('/all', async (req, res) => {
    try {
        const queries = await Queries.find();
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new query
router.post('/add', async (req, res) => {
    try {
        const newQuery = new Queries(req.body);
        const { name, email, message } = newQuery;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save the query to the database
        await newQuery.save();
        res.status(200).json(newQuery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit an existing query by ID
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingQuery = await Queries.findById(id);

        if (!existingQuery) {
            return res.status(404).json({ message: "Query not found" });
        }

        const updatedQuery = await Queries.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedQuery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a query by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingQuery = await Queries.findById(id);

        if (!existingQuery) {
            return res.status(404).json({ message: "Query not found" });
        }

        await Queries.findByIdAndDelete(id);
        res.status(200).json({ message: "Query deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
