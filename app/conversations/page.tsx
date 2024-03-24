"use client";

// @ts-ignore
import useConversation from "@/hooks/use-conversation";
// @ts-ignore
import EmptyState from "@/app/components/empty-state";
import clsx from "clsx";

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
