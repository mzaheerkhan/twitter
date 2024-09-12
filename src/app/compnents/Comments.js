import Moment from "react-moment";
import Image from "next/image";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import { db, storage } from "../../../firebase";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modelState, postIdState } from "../../../atom/atomModal";
import { useRouter } from "next/navigation";
import { comment } from "postcss";

export const Comments = ({ comment, commentId, originalPostId }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modelState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  {
    /* Funtion that creates likes doc in the firebase database */
  }
  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commentId]);

  {
    /* Funtion that set the likes doc in the firebase database */
  }
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  {
    async function likeComment() {
      if (session) {
        if (hasLiked) {
          await deleteDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              session?.user.uid
            )
          );
        } else {
          await setDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              session?.user.uid
            ),
            {
              username: session.user.username,
            }
          );
        }
      } else {
        signIn();
      }
    }
    const deleteComment = async () => {
      if (window.confirm("Are you sure to delete this comment?")) {
        deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
      }
    };
    return (
      <div className="flex p-3 cursor-pointer border-b border-gray-200 ml-20">
        <Image
          src={comment?.userImg}
          width={100}
          height={100}
          className="h-11 w-11 rounded-full mr-4"
          alt="user-image"
        />

        <div className="flex-1 max-w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            {/* post user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px]  hover:underline truncate">
                {comment?.name}
              </h4>
              <span className="text-sm sm:text-[15px] truncate max-w-[100px]">
                @{comment?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline truncate">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
          {/* post text */}
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
            {comment?.comment}
          </p>

          {/* icons */}
          <div className="flex items-center justify-between text-gray-500 p-2">
            <div className="flex items-center justify-center">
              <ChatBubbleOvalLeftEllipsisIcon
                onClick={() => {
                  if (!session) {
                    signIn();
                  } else {
                    setOpen(!open);
                    setPostId(originalPostId);
                  }
                }}
                className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100  "
              />
            </div>
            {session?.user.uid === comment?.userId && (
              <TrashIcon
                onClick={deleteComment}
                className="h-9 w-9 hoverEffect p-2 hover:red-sky-600 hover:bg-red-100"
              />
            )}

            <div className="flex items-center">
              {hasLiked ? (
                <HeartIconFilled
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                />
              )}
              {likes.length > 0 && (
                <span
                  className={`${
                    hasLiked && "text-red-600"
                  } text-sm select-none`}
                >
                  {" "}
                  {likes.length}
                </span>
              )}
            </div>

            <ShareIcon className=" h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            <ChartBarIcon className=" h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    );
  }
};
