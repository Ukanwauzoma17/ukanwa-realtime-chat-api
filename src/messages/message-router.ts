import { isAuthenticated } from './../middleware/auth';
import express from "express";
import { sendMessage } from "./message-controller";



const router = express.Router();

router.post("/",isAuthenticated, sendMessage);

export default router