const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        age,
    });
    try {
        await user.save();
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un problema al crear el usuario' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
    res.status(200).json({ message: 'Usuario logueado correctamente', token });
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un problema al eliminar el usuario' });
    }
});

router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No autenticado' });
    }
    res.status(200).json({ user: req.user });
});

module.exports = router;