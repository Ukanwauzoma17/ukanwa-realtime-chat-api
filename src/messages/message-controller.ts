import { Request, Response } from "express";
import ErrorResponse from "../utils/error-response";
import SuccessResponse from "../utils/success-response";

import {
  findByDmId,
  findByReceiverId,
  findBySenderId,
  newMessage,
} from "./message-service";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dmId = req.query.dmId as string;
  const senderId = req.user?.id;

  if (!senderId) {
    ErrorResponse.send(res, { message: "User not found" });
    return;
  }

  const { receiverId, message } = req.body;

  const sender = await findBySenderId(senderId);
  const receiver = await findByReceiverId(receiverId);
  const directMessage = await findByDmId(dmId);

  if (sender && receiver && directMessage) {
    const sentMessage = await newMessage(senderId, receiverId, message);
    SuccessResponse.send(res, { sentMessage });
  } else {
    ErrorResponse.send(res, { message: "Error: Cannot complete your request" });
  }
};
