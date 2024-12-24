import { getAllMessage, addMessage } from "../controllers/messagesController.js";
import express from "express";
import { tokenVerification } from "../middleware/token.js";

const router = express.Router();

router.post("/addmsg/", tokenVerification, addMessage);
router.post("/getmsg/", tokenVerification, getAllMessage);

export default router;
