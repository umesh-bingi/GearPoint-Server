const express = require('express');
const router = express.Router();
const Users = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const { validateTokenAdmin } = require('../config/auth'); // Assuming admin token validation middleware

// Method : GET || API : /users/all
router.get('/all',  async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : POST || API : /users/add
router.post('/add', async (req, res) => {
    try {
        const { name, email, phone, password, role,address } = req.body;
        if (!name || !email || !phone || !password ) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Email & Phone Validation
        const existingEmail = await Users.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: `User with ${email} already exists!` });
        }

        const existingPhone = await Users.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({ message: `User with ${phone} already exists!` });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            email,
            phone,
            role,
            password: hashedPassword,
            address
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : PUT || API : /users/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingUser = await Users.findOne({ _id: id });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : PUT || API : /users/resetpassword/:id
router.put('/resetpassword/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json("Invalid request");
        }

        const existingUser = await Users.findOne({ _id: id });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await Users.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

        return res.status(200).json({ message: 'Password updated!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Method : DELETE || API : /users/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingUser = await Users.findOne({ _id: id });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        await Users.findByIdAndDelete(id);
        res.status(200).json({ message: "User Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
