import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  const userDTO = {
    email: req.user.email,
    role: req.user.role
  };
  res.json(userDTO);
});

export default router;