import getConversationById from "@/actions/get-coversation-by-id";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/app/components/empty-state";
import Header from "@/app/conversations/[conversationId]/_components/header";
import Body from "@/app/conversations/[conversationId]/_components/body";
import Form from "@/app/conversations/[conversationId]/_components/form";

interface IParams {
  conversationId: string;
}
const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  console.log({ messages });

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
