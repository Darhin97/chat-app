import Sidebar from "@/app/components/sidebar/sidebar";
import ConversationList from "@/app/conversations/_components/conversation-list";
import getConversations from "@/actions/get-conversations";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className={"h-full"}>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
