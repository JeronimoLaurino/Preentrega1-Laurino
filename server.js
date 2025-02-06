const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
require('./passport');

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});