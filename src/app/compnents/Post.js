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

import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modelState, postIdState } from "../../../atom/atomModal";
import { useRouter } from "next/navigation";
import { userModal } from "../../../atom/userAtom";

export const Post = ({ post, id }) => {
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modelState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useRecoilState(userModal);

  {
    /* Funtion that creates comments doc in the firebase database */
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  {
    /* Funtion that creates likes doc in the firebase database */
  }
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  {
    /* Funtion that set the likes doc in the firebase database */
  }
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);

  {
    async function likePost() {
      if (currentUser) {
        if (hasLiked) {
          await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
        } else {
          await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
            username: currentUser?.username,
          });
        }
      } else {
        router.push("/auth/signin");
      }
    }
    const deletePost = async () => {
      if (window.confirm("Are you sure to delete this post?")) {
        deleteDoc(doc(db, "posts", id));
        if (post.data().image) {
          deleteObject(ref(storage, `posts/${id}/image`));
        }
        router.push("/");
      }
    };
    return (
      <div className="flex p-3 cursor-pointer border-b border-gray-200">
        <Image
          src={post?.data().userImg}
          width={100}
          height={100}
          className="h-11 w-11 rounded-full mr-4"
          alt="user-image"
        />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            {/* post user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data().name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data().username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
              </span>
            </div>
            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
          {/* post text */}
          <p
            onClick={() => router.push(`/posts/${id}`)}
            className="text-gray-800 text-[15px] sm:text-[16px] mb-2"
          >
            {post?.data().text}
          </p>
          {/* post img */}
          {post?.data().image && (
            <Image
              onClick={() => router.push(`/posts/${id}`)}
              src={post?.data().image}
              width={500}
              height={500}
              className="rounded-2xl mr-2 h-auto w-auto"
              alt="post-image"
            />
          )}

          {/* icons */}
          <div className="flex items-center justify-between text-gray-500 p-2">
            <div className="flex items-center justify-center">
              <ChatBubbleOvalLeftEllipsisIcon
                onClick={() => {
                  if (!currentUser) {
                    router.push("/auth/signin");
                  } else {
                    setOpen(!open);
                    setPostId(id);
                  }
                }}
                className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100  "
              />
              {comments.length > 0 && (
                <span className="text-sm">{comments.length}</span>
              )}
            </div>
            {currentUser?.uid === post?.data().id && (
              <TrashIcon
                onClick={deletePost}
                className="h-9 w-9 hoverEffect p-2 hover:red-sky-600 hover:bg-red-100"
              />
            )}

            <div className="flex items-center">
              {hasLiked ? (
                <HeartIconFilled
                  onClick={likePost}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likePost}
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
