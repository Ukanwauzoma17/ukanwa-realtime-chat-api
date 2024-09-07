import { isAuthenticated } from "./../middleware/auth";
import express from "express";
import { followUser, unFollowUser } from "./follower-contoller";

const router = express.Router();

router.post("/", isAuthenticated, followUser);
router.post("/unfollow", isAuthenticated, unFollowUser);

export default router;
