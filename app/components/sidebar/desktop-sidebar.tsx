"use client";
import useRoutes from "@/hooks/use-routes";
import { useState } from "react";
import DesktopItem from "@/app/components/sidebar/desktop-item";
import { User } from "@prisma/client";
import Avatar from "@/app/components/avatar";
import SettingsModal from "@/app/components/sidebar/settings-modal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  // console.log({ currentUser });

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />

      <div
        className={
          "hidden lg:fixed  lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between"
        }
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div className={"relative"}>
            <div
              onClick={() => setIsOpen(true)}
              className="cursor-pointer hover:opacity-75 transition"
            >
              <Avatar user={currentUser} />
            </div>
            <span
              className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
          "
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
