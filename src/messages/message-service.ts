import Message from "./model/message-model";

export const findBySenderId = async (
  senderId: number
): Promise<Message | null> => {
  const user = await Message.findOne({
    where: { senderId },
  });
  return user;
};

export const findByReceiverId = async (
  receiverId: number
): Promise<Message | null> => {
  const user = await Message.findOne({
    where: { receiverId },
  });
  return user;
};

export const findByDmId = async (dmId: string): Promise<Message | null> => {
  const dm = await Message.findOne({
    where: { dmId },
  });
  return dm;
};

export async function newMessage(
  senderId: number,
  receiverId: number,
  message: string
) {
  const sender = await findBySenderId(senderId);
  const receiver = await findByReceiverId(receiverId);

  if (sender && receiver) {
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      sentTime: new Date(),
    });

    return newMessage;
  }

  return null;
}
