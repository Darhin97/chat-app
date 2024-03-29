import Sidebar from "@/app/components/sidebar/sidebar";
import getUsers from "@/actions/get-users";
import UserList from "@/app/users/_components/user-list";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  // console.log("User page", { users });

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
