const mongoose = require('mongoose');

// Define Accessories Schema
const AccessoriesSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    img: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0; // Price must be greater than 0
            },
            message: 'Price must be a positive number'
        }
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Helmet', 'Gloves', 'Jacket', 'Boots', 'Other'] // Optional: Predefined categories
    },
    brand: { 
        type: String, 
        required: true
    },
    stock: { 
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v >= 0; // Stock can't be negative
            },
            message: 'Stock must be a non-negative number'
        }
    },
    rating: { 
        type: Number, 
        required: true,
        min: 0,
        max: 5
    }
});

// Create Accessories Model
const Accessories = mongoose.model("Accessories", AccessoriesSchema);

module.exports = Accessories;
