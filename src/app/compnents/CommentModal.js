import Modal from "react-modal";
import {
  XMarkIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modelState, postIdState } from "../../../atom/atomModal";
import { userModal } from "../../../atom/userAtom";

export const CommentModal = () => {
  const router = useRouter();
  const [currentUser] = useRecoilState(userModal);
  const [open, setOpen] = useRecoilState(modelState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: currentUser.name,
      username: currentUser.username,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });
    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-1 border-gray-200 rounded-xl shadow-md"
          // Set max-height and make modal scrollable
          style={{ content: { maxHeight: "80vh", overflowY: "auto" } }}
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-1 px-1">
              <div className="hoverEffect h-10 w-10 flex items-center justify-center">
                <XMarkIcon
                  onClick={() => setOpen(false)}
                  className="h-[25px] text-gray-800"
                />
              </div>
            </div>
            <div className="p-3 flex items-center space-x-1 whitespace-nowrap relative ">
              <span className="bg-gray-300 w-0.5 h-full z-[-1] absolute left-8 top-11" />
              <Image
                src={post?.data()?.userImg}
                width={100}
                height={100}
                className="h-11 w-11 rounded-full mr-4"
                alt="user-image"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-800 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex border-b border-gray-200 p-3 space-x-3">
              <Image
                src={currentUser?.userImg}
                width={50}
                height={50}
                alt="profile-img"
                className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
              />

              <div className="w-full divide-y divide-gray-200">
                <div>
                  {/* Constrain the textarea height */}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tweet your reply"
                    rows={2}
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                  />
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </div>
                    <FaceSmileIcon className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input?.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
