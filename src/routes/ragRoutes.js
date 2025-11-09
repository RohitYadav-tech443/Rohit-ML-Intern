import express from "express";
import { handleConversation, bookInterview } from "../controllers/ragController.js";

const router = express.Router();

router.post("/chat", handleConversation);
router.post("/book", bookInterview);

export default router;
