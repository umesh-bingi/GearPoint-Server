const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true, // Product ID
    },
   
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                // Validate email format
                return /^\S+@\S+\.\S+$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (phone) {
                // Validate phone number (basic pattern)
                return /^\d{10}$/.test(phone); // Adjust pattern as per requirements
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    pid: {
        type: String,
        required: true, // Product ID
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Total must be a positive number"],
    },
    orderedAt: {
        type: Date,
        default: Date.now,
    },
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;
