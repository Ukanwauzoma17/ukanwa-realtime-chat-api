import "express-async-errors";
import cors from "cors";
import { Express } from "express";
import authRouter from "../auth/route/auth-router";
import messageRouter from "../messages/message-router"
import followRouter from "../following/follower-router"

// Any other import that is from our source code should be imported here

export default function (app: Express) {
  app.use(
    cors({
      origin: process.env.CORS_ALLOWED_ORIGINS?.split(","),
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type",
      exposedHeaders: "x-auth-token",
      credentials: true,
    })
  );
  
  app.use("/auth",authRouter)
  app.use("/direct",messageRouter)
  app.use("/follow",followRouter)

  
}
