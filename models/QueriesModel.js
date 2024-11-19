const mongoose = require('mongoose');

// Define Queries Schema
const QueriesSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true, // Removes extra whitespace
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                // Basic email validation using regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
    message: { 
        type: String, 
        required: true,
        trim: true,
        minlength: [10, 'Message must be at least 10 characters long'], // Optional minimum length
        maxlength: [1000, 'Message cannot exceed 1000 characters'] // Optional maximum length
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Create Queries Model
const Queries = mongoose.model("Queries", QueriesSchema);

module.exports = Queries;
