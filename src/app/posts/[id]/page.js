"use client";
import { Sidebar } from "../../compnents/Sidebar";
import { Widgets } from "../../compnents/Widgets";
import { CommentModal } from "../../compnents/CommentModal";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useParams } from "next/navigation";
import { Post } from "../../compnents/Post";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function PostPage() {
  const router = useRouter();
  const param = useParams();
  const id = param.id;
  const [post, setPost] = useState();
  const [newsResults, setNewsResults] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const newsResponse = await fetch(
          "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
        );
        const newsResults = await newsResponse.json();
        setNewsResults(newsResults.articles);

        const randomUsersResponse = await fetch(
          "https://randomuser.me/api/?results=30&inc=name,login,picture"
        );
        const randomUsersData = await randomUsersResponse.json();
        setRandomUsers(randomUsersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen mx-auto ">
      {/* Sidebar */}
      <Sidebar />

      {/* Feeds */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 items-center space-x-2 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="hoverEffect" onClick={() => router.push("/")}>
            <ArrowLeftIcon className="h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        </div>
        <Post id={id} post={post} />
      </div>
      {/* Widgets */}
      <Widgets newsResults={newsResults} randomUsers={randomUsers} />

      {/* Modal*/}
      <CommentModal />
    </main>
  );
}
