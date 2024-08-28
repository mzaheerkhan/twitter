"use client";
import Image from "next/image";
import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export const Input = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <>
      {session && session.user && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <Image
            onClick={signOut}
            src={session.user.image}
            width={50}
            height={50}
            alt="profile-img"
            className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
          />

          <div className="w-full divide-y divide-gray-200">
            <div className=" ">
              <textarea
                placeholder="What's happening?"
                rows={2}
                className="w-full  border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex">
                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                <FaceSmileIcon className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </div>
              <button className="bg-blue-400 text-white px-4 pu-1.5 rounded-full font-bold shadow-md hover:brightness-95  disabled:opacity-50">
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
