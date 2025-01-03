import { Router } from 'express';
import { register, login, setAvatar, getAllUsers } from '../controllers/userController.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

export default router;
