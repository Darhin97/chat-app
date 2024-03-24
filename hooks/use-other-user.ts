import { FullConversationType } from "@/types/type";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      },
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUserF = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );

    return otherUserF[0];
  }, [session?.data?.user?.email, conversation]);

  return otherUser;
};

export default useOtherUser;
