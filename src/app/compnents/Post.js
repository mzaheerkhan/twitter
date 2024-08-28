import Image from "next/image";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export const Post = ({ post }) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <Image
        src={post.userImg}
        width={50}
        height={50}
        alt="post-profile"
        className="rounded-full h-10 w-10 mr-4"
      />
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.userName}</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              - {post.timeStamp}
            </span>
          </div>
          <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        {/* post img */}
        <Image
          src={post.img}
          width={500}
          height={500}
          className="rounded-2xl mr-2"
          alt="post-image"
        />
        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:red-sky-600 hover:bg-red-100" />
          <HeartIcon className=" h-9 w-9 hoverEffect p-2 hover:red-sky-600 hover:bg-red-100" />
          <ShareIcon className=" h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className=" h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};
