import Sidebar from "@/app/components/sidebar/sidebar";
import ConversationList from "@/app/conversations/_components/conversation-list";
import getConversations from "@/actions/get-conversations";
import getUsers from "@/actions/get-users";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className={"h-full"}>
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
