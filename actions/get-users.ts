import getSession from "@/actions/get-session";
import { db } from "@/libs/prismadb";

const getUsers = async () => {
  const session = await getSession();
  // console.log("getUser", { session });
  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc", //newest users
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (err) {
    return [];
  }
};
export default getUsers;
