import { findByUserId } from "./../users/service/user-service";
import { ErrorResponse } from "./../../src/utils/error-response";
import { Request, Response } from "express";
import SuccessResponse from "../utils/success-response";
import { followed, unfollowed } from "./follower-service";

export const followUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { followerUserId } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    ErrorResponse.send(res, { message: "User not Found" });
    return;
  }
  const follower = await findByUserId(followerUserId);

  if (userId && follower) {
    const followSuccess = await followed(userId, followerUserId);
    SuccessResponse.send(res, {
      message: `You are now following ${follower.userName}`,
      followSuccess,
    });
  }
  ErrorResponse.send(res, {
    message: `Error : Cannot follower ${follower?.userName}`,
  });
};

export const unFollowUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { followerUserId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    ErrorResponse.send(res, { message: "User not Found" });
    return;
  }

  const follower = await findByUserId(followerUserId);

  if (userId && follower) {
    const unfollowSuccess = await unfollowed(userId, followerUserId);

    if (unfollowSuccess) {
      SuccessResponse.send(res, {
        message: `You have unfollowed ${follower.userName}`,
        unfollowSuccess,
      });
    }
    ErrorResponse.send(res, {
      message: `Error: Cannot unfollow ${follower.userName}`,
    });
  }
  ErrorResponse.send(res, { message: `Error: User or follower not found` });
};
