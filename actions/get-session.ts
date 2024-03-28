import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-config";

export default async function getSession() {
  return await getServerSession(authOptions);
}
