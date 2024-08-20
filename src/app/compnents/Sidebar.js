import Image from "next/image";
import SidebarMenuItems from "./SidebarMenuItems";

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
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24 ">
      {/* Twitter logo */}
      <div className="hoverEffect  hover:bg-blue-100 xl:px-2 xl:ml-5">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-h-e2hgz8mwGfCt4gvj4IgMG_wAUolVM6w&s"
          alt="Twitter Img"
          width={40}
          height={40}
        />
      </div>
      {/* MenuItems */}
      <div className=" mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItems text="Home" Icon={HomeIcon} active />
        <SidebarMenuItems text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItems text="Notifications" Icon={BellIcon} />
        <SidebarMenuItems text="Messages" Icon={InboxIcon} />
        <SidebarMenuItems text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItems text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItems text="Profile" Icon={UserIcon} />
        <SidebarMenuItems text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      {/* Button */}

      <button className="bg-blue-400 rounded-full text-white w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline mt-2">
        Tweet
      </button>

      {/* mini-Profile */}

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <Image
          src="/profile.png"
          width={50}
          height={50}
          className="rounded-full h-10 w-10 xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h3 className="font-bold">Zaheer Khan</h3>
          <p className="text-gray-500">@Xaheerkhan000</p>
        </div>
        <div className="hidden  xl:inline xl:ml-7">
          <EllipsisHorizontalIcon className="h-5   " />
        </div>
      </div>
    </div>
  );
};
