import Message from "./model/message-model";

export async function findBySenderId(senderId: number) {
  const user = await Message.findOne({
    where: { senderId },
  });
  return user;
}

export async function findByReceiverId(receiverId: number) {
  const user = await Message.findOne({
    where: { receiverId },
  });
  return user;
}

export async function sendMessage(
  senderId: number,
  receiverId: number,
  message: string
) {
  const sender = await findBySenderId(senderId);
  const receiver = await findByReceiverId(receiverId);
  if (sender && receiver) {
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      sentTime: new Date(),
    });

    await newMessage.save();
  }
}
