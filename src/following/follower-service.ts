import Message from "../messages/model/message-model";
import { generateDmId } from "../utils/genertae-dm-id";
import { generateFollowId } from "../utils/genertae-follow-id";
import { findByUserId } from "./../users/service/user-service";
import Followers from "./model/follower-model";

export async function followed(userId: number, followerUserId: number) {
  const user = await findByUserId(userId);
  const follower = await findByUserId(followerUserId);

  const followId = generateFollowId();
  const dmId = generateDmId();

  if (user && follower) {
    await Followers.create({
      followId,
      userId,
      followerUserId,
    });

    await Message.create({
      dmId,
    });
  }
  return {followId,dmId,userId,followerUserId}
}


export async function unfollowed(userId: number, followerUserId: number) {
  const user = await findByUserId(userId);
  const follower = await findByUserId(followerUserId);

  if (!user || !follower) {
    return false; 
  }
  await Followers.destroy({
    where: {
      userId,
      followerUserId,
    },
  });
  return true; 
}