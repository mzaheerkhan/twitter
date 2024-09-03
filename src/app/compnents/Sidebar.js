"use client";
import Image from "next/image";
import SidebarMenuItems from "./SidebarMenuItems";
import twitter from "../images/twitter.png";
import { useSession, signIn, signOut } from "next-auth/react";

import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  InboxIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export const Sidebar = () => {
  const { data: session } = useSession();
  //console.log(session && session.user);
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24 ">
      {/* Twitter logo */}
      <div className="hoverEffect  hover:bg-blue-100 xl:px-2 xl:ml-2">
        <Image src={twitter} alt="Twitter Img" width={32} height={32}  />
      </div>
      {/* MenuItems */}
      <div className=" mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text="Home" Icon={HomeIcon} active />
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItems text="Notifications" Icon={BellIcon} />
            <SidebarMenuItems text="Messages" Icon={InboxIcon} />
            <SidebarMenuItems text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItems text="Profile" Icon={UserIcon} />
            <SidebarMenuItems text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>

      {session ? (
        <>
          {/* Button */}
          <button className="bg-blue-400 rounded-full text-white w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline mt-2">
            Tweet
          </button>

          {/* mini-Profile */}

          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <Image
              onClick={signOut}
              src={session.user.image}
              width={50}
              height={50}
              className="rounded-full h-10 w-10 xl:mr-2"
              alt="profile-img"
             
            />
            <div className="leading-5 hidden xl:inline">
              <h3 className="font-bold">
                {session && session.user && session.user.name}
              </h3>
              <p className="text-gray-500">
                @{session && session.user && session.user.username}
              </p>
            </div>
            <div className="hidden  xl:inline xl:ml-7">
              <EllipsisHorizontalIcon className="h-5   " />
            </div>
          </div>
        </>
      ) : (
        <button
          className="bg-blue-400 rounded-full text-white w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline mt-2"
          onClick={signIn}
        >
          Sign in
        </button>
      )}
    </div>
  );
};
