import getCurrentUser from "@/actions/get-current-user";
import { db } from "@/libs/prismadb";

const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc", //last msg first
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (err) {
    return [];
  }
};

export default getConversations;
