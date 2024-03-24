"use client";

import { FullConversationType } from "@/types/type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/use-conversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "@/app/conversations/_components/conversation-box";

interface ConversationListProps {
  initialItems: FullConversationType[];
}
const ConversationList = ({ initialItems }: ConversationListProps) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block",
      )}
    >
      <div className={"px-5"}>
        <div className={"flex justify-between mb-4 pt-4"}>
          <div className={"text-2xl font-bold text-neutral-900"}>Messages</div>
          <div
            className={
              "rounded-full p-2 bg-gray-100 cursor-pointer text-gray-600 hover:opacity-75 transition"
            }
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
