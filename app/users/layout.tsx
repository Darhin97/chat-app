import Sidebar from "@/app/components/sidebar/sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        {/*<UserList items={users} />*/}
        {children}
      </div>
    </Sidebar>
  );
}
