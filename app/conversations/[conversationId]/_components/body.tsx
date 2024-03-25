"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/types/type";
import useConversation from "@/hooks/use-conversation";
import MessageBox from "@/app/conversations/[conversationId]/_components/message-box";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body = ({ initialMessages }: BodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, []);

  return (
    <div className={"flex-1 overflow-y-auto"}>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className={"pt-24"} ref={bottomRef}></div>
    </div>
  );
};

export default Body;
