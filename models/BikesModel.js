const mongoose = require('mongoose');

// Define Bike Schema
const BikesSchema = new mongoose.Schema({
    title: { 
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
    brand: { 
        type: String, 
        required: true
    },
    rating: { 
        type: Number, 
        required: true,
        min: 0,
        max: 5
    }
});

// Create Bike Model
const Bikes = mongoose.model("Bikes", BikesSchema);

module.exports = Bikes;
