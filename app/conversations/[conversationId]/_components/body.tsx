"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/types/type";
import useConversation from "@/hooks/use-conversation";
import MessageBox from "@/app/conversations/[conversationId]/_components/message-box";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body = ({ initialMessages }: BodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    //updates seen array in real-time
    const updateMessageHanlder = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        }),
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHanlder);

    //unsubscribe to channel and unbind when component unmounts
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHanlder);
    };
  }, [conversationId]);

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
