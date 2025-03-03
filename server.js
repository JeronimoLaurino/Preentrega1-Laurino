import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import currentRoute from './routes/current.js';
import cartRoute from './routes/carts.js';
import productRoute from './routes/products.js';
import userRoute from './routes/users.js';
import { authMiddleware } from './middlewares/auth.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/current', currentRoute);
app.use('/carts', authMiddleware, cartRoute);
app.use('/products', authMiddleware, productRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err);
    });